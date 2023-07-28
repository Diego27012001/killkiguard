import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Camera {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true, unique: true })
  serie: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Buffer, required: true }) // Tipo Buffer para almacenar la imagen
  camImage?: Buffer;

  @Prop({ required: true })
  installationDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const CameraSchema = SchemaFactory.createForClass(Camera);

export type CameraDocument = Camera & Document; // Definición de UserDocument
