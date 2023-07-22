import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @IsMongoId({
    message: 'El valor proporcionado no es un _id válido',
  })
  readonly _id: string;

  //Validando el campo contraseña
  @MaxLength(20, {
    message: 'La contraseña solo puede contener 20 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'La contraseña solo puede contener solo letras y números.' })
  @IsOptional()
  readonly password: string;
}
