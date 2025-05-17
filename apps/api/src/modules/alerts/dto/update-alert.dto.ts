import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";
import { SEVERITIES, Severity } from "../domain/alert.entity";

export class UpdateAlertDto {
  @IsOptional()
  @IsString()
  title?: string | null;

  @IsOptional()
  @IsString()
  message?: string | null;

  @IsOptional()
  @IsIn(SEVERITIES)
  severity?: Severity;

  @IsOptional()
  @IsDateString()
  reminderAt?: string | null;

  @IsOptional()
  @IsDateString()
  deadline?: string | null;
}
