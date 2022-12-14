import { Module } from '@nestjs/common';
import { OtpServiceModule } from './otp-service/otp-service.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'otp',
      entities: [User],
      synchronize: true,
    }),
    OtpServiceModule,
    UserModule,
  ],
})
export class AppModule {}
