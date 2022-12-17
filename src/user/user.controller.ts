import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() payload: CreateUser): Promise<any> {
    console.log('payload -> ', payload);
    return Promise.resolve(this.userService.create(payload));
  }

  @Get()
  getUserByEmailAndPassowrd(
    @Query('email') email,
    @Query('password') password,
  ): Promise<User> {
    console.log('getUserByEmailAndPassowrd : ', email, password);
    return Promise.resolve(
      this.userService.getUserByEmailAndPassword(email, password),
    );
  }
}
