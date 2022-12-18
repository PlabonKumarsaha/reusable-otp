import { CacheModule, Module } from '@nestjs/common';
import { UserOtpConfig } from 'src/user/dto/otp-config.dto';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { OtpServiceController } from './otp-service.controller';
import { OtpServiceService } from './otp-service.service';

@Module({
  imports: [UserModule, CacheModule.register()],
  controllers: [OtpServiceController],
  providers: [OtpServiceService],
})
export class OtpServiceModule {}
