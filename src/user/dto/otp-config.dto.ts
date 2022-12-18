import { IsEmail, IsString, IsAlphanumeric } from 'class-validator';

export class UserOtpConfig {
  @IsString()
  template: string;
  @IsAlphanumeric()
  duration: number;
  @IsString()
  otpType: string;
  @IsAlphanumeric()
  otpLength: number;
}
