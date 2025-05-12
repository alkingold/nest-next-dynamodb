import { Severity } from "./guards/is-severity";

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  reminderAt?: string | null;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateAlertDto = Omit<Alert, "id" | "createdAt" | "updatedAt">;

export type UpdateAlertDto = Omit<Alert, "id" | "createdAt" | "updatedAt">;
