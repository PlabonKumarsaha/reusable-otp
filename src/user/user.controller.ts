import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() payload: CreateUser): Promise<any> {
    console.log('payload -> ', payload);
    return Promise.resolve(this.userService.create(payload));
  }
}
