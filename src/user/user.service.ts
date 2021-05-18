import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { throws } from 'assert';
import { Model, Mongoose } from 'mongoose';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getUsers() {
    return this.userModel.find({});
  }

  async createUser(createUser: CreateUserDTO) {
    try {
      const isExistingUser = await this.userModel.findOne({
        email: createUser.email,
      });

      if (isExistingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      createUser.password = await bcrypt
        .hash(createUser.password, 10)
        .then(r => r);
      return await new this.userModel(createUser).save();
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong ', HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async login({ password, email }) {
    try {
      const foundUser = await this.userModel.findOne({ email });
      const passwordComparison = await bcrypt.compare(
        password,
        foundUser.password,
      );
      if (foundUser && passwordComparison) {
        return this.getToken(foundUser.email, foundUser._id);
      }
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  async findUserById(_id: string) {
    return await this.userModel.findById(_id);
  }

  async getToken(
    email: string,
    _id,
  ): Promise<{ _id: string; jwtToken: string }> {
    try {
      const jwtToken = await this.jwtService.signAsync({ email, _id });
      return {
        _id,
        jwtToken,
      };
    } catch (err) {
      console.error(err);
    }
  }
}
