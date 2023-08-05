import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";

export class CreateIncidentDto {
  @IsNotEmpty({ message: 'La descripción corta es requerida' })
  @IsString({ message: 'La descripción corta debe ser un texto válido' })
  readonly short_description: string;

  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser un texto válido' })
  readonly description: string;

  @IsNotEmpty({ message: 'La fecha es requerida' })
  @IsDate({ message: 'La fecha debe ser una fecha válida' })
  readonly date: Date;

  @IsNotEmpty({ message: 'La hora de inicio es requerida' })

  readonly start_time: string;

  @IsNotEmpty({ message: 'La hora de finalización es requerida' })
  readonly end_time: string;

  @IsNotEmpty({ message: 'La ubicación es requerida' })
  @IsString({ message: 'La ubicación debe ser un texto válido' })
  readonly location: string;

   //Validando el campo tipo de usuario
   @IsMongoId({
    message: 'El valor proporcionado no es un _id válido',
  })
  @IsNotEmpty({
    message: 'El rol es requerido',
  })
  readonly resident: string;

  @IsOptional()
  @IsMongoId({ each: true, message: 'Cada ID de cámara debe ser un ID válido de MongoDB' })
  readonly camera: string[];
}
