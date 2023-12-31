import { IsEmail, IsMongoId, IsNotEmpty, IsNumberString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { IsMimeType, MaxFileSize } from "./custom-validations/validate-image.validate";

export class CreateUserDto {
  @IsNotEmpty({
    message: 'El campo nombre es requerido',
  })
  @MinLength(2, {
    message: 'El campo nombre debe contener 2 caracteres como mínimo',
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

  //Validando el campo para usuario
  // @UserExists()
  @IsNotEmpty({
    message: 'El campo nombre de usuario es requerido',
  })
  @MinLength(6, {
    message: 'El campo nombre de usuario debe contener 6 caracteres como mínimo',
  })
  @MaxLength(16, {
    message: 'El campo nombre de usuario solo puede contener 16 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'El campo nombre de usuario debe contener solo letras y números' })
  readonly username: string;

  //Validando el campo contraseña
  @IsNotEmpty({
    message: 'El campo contraseña es requerido',
  })
  @MinLength(6, {
    message: 'La contraseña debe contener 6 caracteres como mínimo',
  })
  @MaxLength(20, {
    message: 'La contraseña solo puede contener 20 caracteres como máximo',
  })
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'La contraseña solo puede contener solo letras y números.' })
  readonly password: string;

  //Validando el campo email
  @IsNotEmpty({
    message: 'El campo email es requerido',
  })
  @IsEmail({}, {
    message: 'El correo ingresado es inválido',
  })
  readonly email: string;

  @IsNotEmpty({
    message: 'El campo teléfono es requerido',
  })
  @Length(9)
  // @Matches(/^(\+51)/)
  readonly phone: string;

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

  // Campo de imagen
  @IsNotEmpty({
    message: 'La imagen de perfil es requerida',
  })
  @IsMimeType(['image/jpeg', 'image/png']) // Validar el tipo de archivo (opcionalmente puedes agregar más tipos)
  @MaxFileSize(2 * 1024 * 1024) // 2 MB como tamaño máximo permitido
  readonly profileImage: any; // Aquí, 'any' se utiliza porque es un campo de archivo, el tipo real dependerá del manejador de archivos que estés utilizando

  //Validando el campo tipo de usuario
  @IsMongoId({
    message: 'El valor proporcionado no es un _id válido',
  })
  @IsNotEmpty({
    message: 'El rol es requerido',
  })
  readonly role: string;
}