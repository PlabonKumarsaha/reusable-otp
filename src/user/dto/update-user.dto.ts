import { IsEmail, IsString, IsAlphanumeric } from 'class-validator';

export class UpdateUser {
  id: number;
  @IsEmail()
  email: string;
  password: string;
  template: string;
  duration: number;
  otpType: string;
  key: string;
}
