import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @IsMongoId({
    message: 'El valor proporcionado no es un _id válido',
  })
  // @IsUUID()
  readonly _id: string;
  // readonly uuid: string;
}
