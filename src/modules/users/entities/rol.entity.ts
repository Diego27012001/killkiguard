import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  //SoftDelete
  @Prop()
  deletedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export type RoleDocument = Role & Document; // Definición de RoleDocument
