import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from 'src/user/user.service';
import { GenerateOTP } from './dtos/generate-otp.dto';
import { RequestForOTP } from './dtos/request-for-otp.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OtpServiceService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
  ) {}

  async generateOtp(
    otpType: OtpType,
    length: number,
    ttl: number,
  ): Promise<GenerateOTP> {
    let otp = '';
    if (otpType == OtpType.NUMERIC) {
      otp = this.getNumericOtp(length);
    } else if (otpType == OtpType.ALPHA) {
      otp = this.getAlphanumericOtp(length);
    } else {
      otp = this.getAlNumSmallOtp(length);
    }
    const key: string = uuidv4();
    await this.cacheManager.set(key, otp, ttl);
    return Promise.resolve({ key, otp });
  }

  async verifyOtp(email: string, otp: string): Promise<any> {
    const value = await this.cacheManager.get<string>(email);
    if (value == otp) {
      return Promise.resolve('OTP Verified!');
    } else {
      return Promise.resolve('Unverified');
    }
  }

  async generateOtpWithConfig(key: string, otpRequest: RequestForOTP) {
    const userConfig = await this.userService.getUserByKey(key);
    // this.generateOtp(otpRequest.email,)

    if (otpRequest.channel == Channel.EMAIL.toString()) {
      // call mobile notification service
    }
  }
  getNumericOtp(length: number) {
    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  getAlphanumericOtp(length: number) {
    const string =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < length; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  getAlNumSmallOtp(length: number) {
    const string = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < length; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }
}
