import { IsDate, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateIncidentDto {
  readonly short_description: string;

  readonly description: string;

  readonly date: Date;

  readonly start_time: string;

  readonly end_time: string;

  readonly location: string;

  readonly resident: [];

  readonly camera: [];
}
