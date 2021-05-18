import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import ReqWithUser from 'src/reqWithUser';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.gaurd';
import { UserService } from 'src/user/user.service';
import { CreateTaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async deleteTask(@Req() req: ReqWithUser, @Param('taskId') taskId: string) {
    return await this.taskService.deleteTask(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Req() req: ReqWithUser,
    @Body() createTaskDto: CreateTaskDTO,
  ) {
    const currentUser = await this.userService.findUserById(req._id);
    console.log(currentUser);
    createTaskDto.asignee = currentUser;
    const { asigneeEmail } = createTaskDto;
    if (asigneeEmail) {
      const assignedUser = await this.userService.findUserByEmail(asigneeEmail);
      createTaskDto.asignee = assignedUser;
      delete createTaskDto.asigneeEmail;
    }
    const createdTask = await this.taskService.createTask(createTaskDto);
    return createdTask;
  }
}
