import { IsEmail, IsString, IsAlphanumeric } from 'class-validator';

export class CreateUser {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  template: string;
  @IsAlphanumeric()
  duration: string;
  @IsString()
  otpType: OtpTypes;
}
