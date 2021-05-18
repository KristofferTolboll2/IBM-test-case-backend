import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from 'src/tasks/task.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: 'hard!to-guess_secret',
        signOptions: { expiresIn: '24h' },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule],
})
export class UserModule {}
