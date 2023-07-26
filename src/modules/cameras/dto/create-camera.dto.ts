import { IsDate, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateCameraDto {
  @IsNotEmpty({
    message: 'El campo modelo es requerido',
  })
  @MinLength(2, {
    message: 'El campo modelo debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo modelo solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo modelo solo puede contener letras' })
  readonly model: string;

  @IsNotEmpty({
    message: 'El campo serie es requerido',
  })
  @MinLength(2, {
    message: 'El campo serie debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo serie solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo serie solo puede contener letras' })
  readonly serie: string;

  @IsNotEmpty({
    message: 'El campo marca es requerido',
  })
  @MinLength(2, {
    message: 'El campo marca debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo marca solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo marca solo puede contener letras' })
  readonly brand: string;

  @MinLength(60, {
    message: 'El campo descripción debe contener 60 caracteres como mínimo',
  })
  @MaxLength(200, {
    message: 'El campo descripción solo puede contener 200 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo descripción solo puede contener letras' })
  @IsOptional()
  readonly description: string;

  @IsNotEmpty({
    message: 'El campo localización es requerido',
  })
  @MinLength(2, {
    message: 'El campo localización debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo localización solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo localización solo puede contener letras' })
  readonly location: string;

  @IsNotEmpty({
    message: 'El campo estado es requerido',
  })
  @MinLength(2, {
    message: 'El campo estado debe contener 2 caracteres como mínimo',
  })
  @MaxLength(60, {
    message: 'El campo estado solo puede contener 60 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$'), { message: 'El campo estado solo puede contener letras' })
  readonly status: string;
  
  @IsNotEmpty({
    message: 'El campo imagen es requerido',
  })
  readonly img: string;

  @IsDate({
    message: 'Ingresar una fecha de instalación válida.'
  })
  @IsNotEmpty({
    message: 'La fecha de instalación es requerida.',
  })
  readonly installationDate: Date;
}
