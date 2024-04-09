import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProfileDTO {
  firstName: string;

  lastName: string;

  age: number;

  dob: string;
}
