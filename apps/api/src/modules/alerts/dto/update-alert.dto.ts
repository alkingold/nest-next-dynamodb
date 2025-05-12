import { Severity } from "../domain/alert.entity";

export class UpdateAlertDto {
  title?: string;
  message?: string;
  severity?: Severity;
  reminderAt?: string | null;
  deadline?: string | null;
}
