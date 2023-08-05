import { IsNotEmpty, MinLength, MaxLength, Matches, IsPhoneNumber } from "class-validator";

export class ContactDto {
  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @MinLength(2, {
    message: 'El campo nombre debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo nombre solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-záéíóúÁÉÍÓÚ ]+$'), { message: 'El campo nombre solo puede contener letras' })
  readonly name: string;

  @IsNotEmpty({
    message: 'El campo apellido es requerido',
  })
  @MinLength(2, {
    message: 'El campo apellido debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo apellido solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-záéíóúÁÉÍÓÚ ]+$'), { message: 'El campo apellido solo puede contener letras' })
  readonly lastname: string;

  @IsNotEmpty({
    message: 'El campo parentesco es requerido',
  })
  @MinLength(2, {
    message: 'El campo parentesco debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo parentesco solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-záéíóúÁÉÍÓÚ ]+$'), { message: 'El campo parentesco solo puede contener letras' })
  readonly relationship: string;

  @IsNotEmpty({
    message: 'El campo teléfono es requerido',
  })
  readonly phone: string;
}