import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePostDTO } from 'src/users/dto/CreatePost.dto';
import { CreateProfileDTO } from 'src/users/dto/CreateProfile.dto';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UserPipe } from 'src/users/pipe/user/user.pipe';
import { UserService } from 'src/users/service/user/user.service';
import { createUserType } from 'src/utils/types';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Query() sort: string) {
    const userList = await this.userService.getUser();
    return userList;
  }

  @Get('profile')
  getUserProfile() {
    return this.userService.getUserProfile();
  }

  // @Post('/request')
  // @UsePipes(new ValidationPipe())
  // createUserUsingRequest(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.send('Created');
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(UserPipe) userObj: CreateUserDTO) {
    return this.userService.createUser(userObj);
  }

  @Post(':id/profile')
  @UsePipes(new ValidationPipe())
  createProfile(
    @Param('id') id: number,
    @Body(UserPipe) profileObj: CreateProfileDTO,
  ) {
    return this.userService.createProfile(id, profileObj);
  }

  @Post(':id/post')
  @UsePipes(new ValidationPipe())
  createPost(@Param('id') id: number, @Body(UserPipe) postObj: CreatePostDTO) {
    return this.userService.createPost(id, postObj);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body(UserPipe) userObj: UpdateUserDTO,
  ) {
    return this.userService.updateUser(id, userObj);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
