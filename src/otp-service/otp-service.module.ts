import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { OtpServiceController } from './otp-service.controller';
import { OtpServiceService } from './otp-service.service';

@Module({
  imports: [UserModule, CacheModule.register()],
  controllers: [OtpServiceController],
  providers: [OtpServiceService],
})
export class OtpServiceModule {}
