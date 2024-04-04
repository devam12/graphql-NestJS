import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UserPipe } from 'src/users/pipe/user/user.pipe';
import { UserService } from 'src/users/service/user/user.service';
import { createUserType } from 'src/utils/types';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserPost(@Query() sort: string) {
    console.log(sort);
    return this.userService.getUser();
  }

  @Post('/request')
  @UsePipes(new ValidationPipe())
  createUserUsingRequest(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('Created');
  }

  @Post('body')
  @UsePipes(new ValidationPipe())
  createUserUsingBody(@Body(UserPipe) userObj: CreateUserDTO) {
    return this.userService.createUser(userObj);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
  }
}
