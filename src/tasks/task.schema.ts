import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export const TaskState = ['Requested', 'To Do', 'In Progress', 'Done'];

@Schema({ collection: 'task' })
export class Task {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  asignee?: User;

  @Prop({ default: null })
  media: string;

  @Prop({ enum: TaskState, default: TaskState[0] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
