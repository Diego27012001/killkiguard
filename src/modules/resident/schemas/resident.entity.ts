import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class Resident {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  dni?: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  sex: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  blood_type: string;

  @Prop({ required: true })
  safe_type: string;

  @Prop({ type: [String], default: [] }) // Array de alergias
  allergies: string[];

  @Prop({ type: [String], default: [] }) // Array de alergias
  diseases: string[];

  @Prop({ required: true })
  birth_date: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Contact' })
  contact: Types.ObjectId;
}

export const ResidentSchema = SchemaFactory.createForClass(Resident);

export type ResidentDocument = Resident & Document; // Definición de RoleDocument
