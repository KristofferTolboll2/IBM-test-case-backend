import { User } from 'src/user/user.schema';
import { TaskState } from '../task.schema';

export class CreateTaskDTO {
  title: string;

  content: string;

  asigneeEmail?: string;

  media?: string;

  status: typeof TaskState[number];

  asignee?: User;

  createdBy: User;
}
