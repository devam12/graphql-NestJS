import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  username: string;

  // @IsEmail()
  @IsNotEmpty()
  password: string;
}
