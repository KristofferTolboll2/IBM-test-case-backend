import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Roles } from './roles/roles';

@Schema({ collection: 'user' })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop({ enum: Roles })
  role?: Roles;

  @Prop()
  createdAt: string = new Date().toISOString();
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
