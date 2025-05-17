import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Severity } from "../domain/alert.entity";

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  severity?: Severity;

  @IsOptional()
  @IsDateString()
  reminderAt?: string | null;

  @IsOptional()
  @IsDateString()
  deadline?: string | null;
}
