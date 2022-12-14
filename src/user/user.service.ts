import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUser } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserOtpConfig } from './dto/otp-config.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(userDto: CreateUser) {
    const user = new User();
    user.email = userDto.email;
    user.duration = userDto.duration;
    user.template = userDto.template;
    user.otpType = userDto.otpType;
    user.password = userDto.password;
    user.configKey = uuidv4();
    user.otpLength = userDto.otpLength;
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(user);
  }
  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const User = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email= :email AND user.password ', {
        email: email,
        password: password,
      })
      .getOne();

    return Promise.resolve(User);
  }

  async getUserByKey(key: string): Promise<UserOtpConfig> {
    const user = await this.userRepo.findOne({ where: { configKey: key } });
    if (!user) {
      throw new HttpException(
        `User with ${key} Not found!`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      const userConfig = new UserOtpConfig();
      userConfig.duration = user.duration;
      userConfig.otpType = user.otpType;
      userConfig.template = user.template;
      userConfig.otpLength = user.otpLength;
      return userConfig;
    }
  }
}
