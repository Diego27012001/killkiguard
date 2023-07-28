import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentDto } from './create-incident.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateIncidentDto extends PartialType(CreateIncidentDto) {
  @IsNotEmpty({
    message: 'El campo es requerido',
  })
  @IsMongoId({
    message: 'El valor proporcionado no es un _id válido',
  })
  readonly _id: string;
}
