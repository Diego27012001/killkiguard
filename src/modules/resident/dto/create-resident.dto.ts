import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsPhoneNumber, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateResidentDto {

  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @MinLength(2, {
    message: 'El campo nombre debe contener 3 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo nombre solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'), { message: 'El campo nombre solo puede contener letras' })
  readonly name: string;

  @IsNotEmpty({
    message: 'El campo usuario es requerido',
  })
  @MinLength(7, {
    message: 'El campo apellidos debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo apellidos solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'), { message: 'El campo apellidos solo puede contener letras' })
  readonly lastname: string;

  @MinLength(8, {
    message: 'La identificación debe contener 8 caracteres como minimo',
  })
  @IsNumberString({}, {
    message: 'La identificación es inválida.'
  })
  // @IdentificationExists(true)
  @IsNotEmpty({
    message: 'La identificación es requerida',
  })
  readonly dni: string;

  @IsNotEmpty({
    message: 'El campo teléfono es requerido',
  })
  @IsPhoneNumber()
  @Length(9)
  // @Matches(/^(\+51)/)
  readonly phone: string;

  
  @IsNotEmpty({
    message: 'El campo sexo es requerido',
  })
  @MinLength(7, {
    message: 'El campo sexo debe contener 7 caracteres como mínimo',
  })
  @MaxLength(10, {
    message: 'El campo sexo solo puede contener 10 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo sexo solo puede contener letras' })
  readonly sex: string;

  @IsNotEmpty({
    message: 'El campo dirección es requerido',
  })
  @MinLength(7, {
    message: 'El campo dirección debe contener 7 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo dirección solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo dirección solo puede contener letras' })
  readonly address: string;

  readonly blood_type: string;

  readonly safe_type: string;

  readonly contact: [];

  readonly allergies: [];

  readonly diseases: [];

  readonly birtg_date: string;
}
