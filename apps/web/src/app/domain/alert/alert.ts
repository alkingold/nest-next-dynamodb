export interface Alert {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  priority?: "info" | "warning" | "critical";
}

export type CreateAlertDto = Omit<Alert, "id" | "createdAt">;

export type UpdateAlertDto = Omit<Alert, "id" | "createdAt">;
