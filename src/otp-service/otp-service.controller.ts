import { Body, Controller, Post } from '@nestjs/common';
import { GenerateOTP } from './dtos/generate-otp.dto';
import { RequestForOTP } from './dtos/request-for-otp.dto';
import { VerifyRequest } from './dtos/verify-otp.dto';
import { OtpServiceService } from './otp-service.service';

@Controller('otp-service')
export class OtpServiceController {
  constructor(private otpService: OtpServiceService) {}
  @Post()
  generateOTP(@Body() payload: RequestForOTP): Promise<GenerateOTP> {
    return Promise.resolve(this.otpService.generateOtpWithConfig(payload));
  }

  @Post('/verify')
  verifyOTP(@Body() payload: VerifyRequest): Promise<string> {
    return Promise.resolve(this.otpService.verifyOtp(payload.key, payload.otp));
  }
}
