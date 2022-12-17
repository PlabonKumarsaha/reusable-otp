import { IsEmail, IsString, IsAlphanumeric } from 'class-validator';

export class GetUserByEmailAndPassword {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
