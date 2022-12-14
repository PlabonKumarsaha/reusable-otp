import { Body, Controller, Post } from '@nestjs/common';
import { OtpServiceService } from './otp-service.service';

@Controller('otp-service')
export class OtpServiceController {
  constructor(private otpService: OtpServiceService) {}
  @Post()
  generateOTP(@Body() payload: any): Promise<any> {
    console.log('payload', payload);
    return Promise.resolve(this.otpService.generateOtp(payload.email, 100));
  }

  @Post('/verify')
  verifyOTP(@Body() payload: any): Promise<any> {
    return Promise.resolve(
      this.otpService.verifyOtp(payload.email, payload.otp),
    );
  }
}
