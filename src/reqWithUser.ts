import { Req } from '@nestjs/common';
import { Request } from 'express';

export default interface ReqWithUser extends Request {
  _id: string;
  email: string;
}
