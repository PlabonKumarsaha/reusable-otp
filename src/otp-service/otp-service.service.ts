import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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
    otpType: string,
    length: number,
    ttl: number,
  ): Promise<GenerateOTP> {
    let otp = '';
    if (otpType == 'NUMERIC') {
      otp = this.getNumericOtp(length);
    } else if (otpType == 'ALPHANEUMERIC') {
      otp = this.getAlphanumericOtp(length);
    } else {
      otp = this.getAlNumSmallOtp(length);
    }
    const key: string = uuidv4();
    await this.cacheManager.set(key, otp, ttl);
    return Promise.resolve({ key, otp });
  }

  async verifyOtp(key: string, otp: string): Promise<string> {
    const value = await this.cacheManager.get<string>(key);
    if (value == otp) {
      this.cacheManager.del(key);
      return Promise.resolve('OTP Verified!');
    } else {
      return Promise.resolve('OTP Unverified');
    }
  }

  async generateOtpWithConfig(otpRequest: RequestForOTP) {
    const userConfig = await this.userService.getUserByKey(
      otpRequest.configKey,
    );
    if (otpRequest.channel == 'EMAIL' && otpRequest.email != null) {
      // call email notification service
      return this.generateOtp(
        userConfig.otpType,
        userConfig.otpLength,
        userConfig.duration,
      );
    } else if (
      otpRequest.channel == 'PHONE' &&
      otpRequest.phoneNumber != null
    ) {
      // call mobile notification service
      return this.generateOtp(
        userConfig.otpType,
        userConfig.otpLength,
        userConfig.duration,
      );
    } else {
      throw new HttpException(`invalid paylaod`, HttpStatus.BAD_REQUEST);
    }
  }
  getNumericOtp(length: number): string {
    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  getAlphanumericOtp(length: number): string {
    const string =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < length; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  getAlNumSmallOtp(length: number): string {
    const string = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < length; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }
}
