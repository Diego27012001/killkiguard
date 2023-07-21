import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  dni?: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  n_tuition: string;

  @Prop({ default: 'assets/images/user/admin.jpg' })
  img?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Role' })
  role: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
