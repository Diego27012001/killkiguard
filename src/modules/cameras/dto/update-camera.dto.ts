import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraDto } from './create-camera.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateCameraDto extends PartialType(CreateCameraDto) {
  @IsNotEmpty({
    message: 'El campo es requerido',
  })
  @IsMongoId({
    message: 'El valor proporcionado no es un _id válido',
  })
  readonly _id: string;
}
