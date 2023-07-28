import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  relationship: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;

  
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

export type ContactDocument = Contact & Document; // Definición de RoleDocument


