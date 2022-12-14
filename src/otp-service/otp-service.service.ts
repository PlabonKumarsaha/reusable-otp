import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class OtpServiceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateOtp(email: string, ttl: number): Promise<number> {
    const otp = Math.floor(Math.random() * 100);
    await this.cacheManager.set(email, otp, 100);
    return Promise.resolve(otp);
  }

  async verifyOtp(email: string, otp: string): Promise<any> {
    const value: string = await this.cacheManager.get(email);
    if (value == otp) {
      return Promise.resolve('OTP Verified!');
    } else {
      return Promise.resolve('Unverified');
    }
  }
}
