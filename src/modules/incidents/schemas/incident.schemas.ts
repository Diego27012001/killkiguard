import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Incident {
  @Prop({ required: true })
  short_description: string;

  @Prop({ required: true })
  description: string;

  @Prop({required: true})
  date: Date;

  @Prop({ required: true })
  start_time: string;

  @Prop({ required: true })
  end_time: string;

  @Prop({ required: true })
  location: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Resident' })
  resident: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Camera' })
  camera: Types.ObjectId;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);

export type IncidentDocument = Incident & Document; // Definición de UserDocument
