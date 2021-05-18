import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateTaskDTO } from './dto/task.dto';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly userService: UserService,
  ) {}

  async deleteTask(_id: string) {
    return await this.taskModel.deleteOne({ _id });
  }

  async getAllTasks() {
    return await this.taskModel.find({});
  }

  async createTask(createTaskDto: CreateTaskDTO) {
    const { title, content, media, status } = createTaskDto;
    const assignedUser = await this.userService.findUserByEmail(
      createTaskDto.asigneeEmail,
    );

    const savedEntity = new this.taskModel({
      asignee: assignedUser,
      media,
      title,
      content,
      status,
    }).save();
    return savedEntity;
  }
}
