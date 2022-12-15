import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUser } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

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
    user.key = uuidv4();
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(user);
  }
}
