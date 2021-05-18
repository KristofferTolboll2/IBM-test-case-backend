import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
