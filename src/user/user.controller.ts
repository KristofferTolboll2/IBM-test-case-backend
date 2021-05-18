import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.gaurd';
import { LocalAuthGuard } from './auth/local-auth.gaurd';
import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  async loginUser(@Body() loginUserDTO: LoginUserDTO) {
    return this.userService.login(loginUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  protected(@Request() req) {
    return {
      message: 'protected',
      user: req.user,
    };
  }
}
