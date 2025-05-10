import { UpdateAlertDto } from "../dto/update-alert.dto";
import { Alert } from "./alert.entity";

export interface AlertRepositoryInterface {
  create(alert: Alert): Promise<Alert>;
  findAll(): Promise<Alert[]>;
  findById(id: string): Promise<Alert | null>;
  update(id: string, alert: UpdateAlertDto): Promise<Alert>;
  delete(id: string): Promise<void>;
}
