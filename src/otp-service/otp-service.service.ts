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

  async generateOtp(channel: string, ttl: number): Promise<GenerateOTP> {
    const otp = Math.floor(Math.random() * 100).toString();
    const key: string = uuidv4();
    await this.cacheManager.set(key, otp, 100);
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
}
