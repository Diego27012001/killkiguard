import { IsArray, IsDateString, IsEmail, IsISO8601, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ContactDto } from "./create-contact.dto";
import { Type } from "class-transformer";

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

  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  readonly contact: ContactDto[];

  @IsString({ message: 'El tipo de sangre debe ser un texto válido' })
  @IsNotEmpty({ message: 'El tipo de sangre es requerido' })
  readonly blood_type: string;

  @IsString({ message: 'El tipo seguro debe ser un texto válido' })
  @IsNotEmpty({ message: 'El tipo seguro es requerido' })
  readonly safe_type: string;

  @IsArray({ message: 'Las alergias deben ser un arreglo válido' })
  @IsOptional()
  readonly allergies: string[];

  @IsArray({ message: 'Las enfermedades deben ser un arreglo válido' })
  @IsOptional()
  readonly diseases: string[];

  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  readonly birth_date: string;
}
