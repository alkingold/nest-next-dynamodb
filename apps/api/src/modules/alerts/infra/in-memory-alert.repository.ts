import { Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";
import { Alert } from "../domain/alert.entity";
import { UpdateAlertDto } from "../dto/update-alert.dto";

@Injectable()
export class InMemoryAlertRepository implements AlertRepositoryInterface {
  private alerts: Alert[] = [];

  async create(alert: Alert): Promise<Alert> {
    this.alerts.push(alert);
    return alert;
  }

  async findAll(): Promise<Alert[]> {
    return this.alerts;
  }

  async findById(id: string): Promise<Alert | null> {
    return this.alerts.find(a => a.id === id) || null;
  }

  async update(id: string, alert: UpdateAlertDto): Promise<Alert> {
    let updatedAlert: Alert;
    this.alerts = this.alerts.map(a => {
      if (a.id === id) {
        updatedAlert = {...a, ...alert};
        return updatedAlert;
      }

      return a;
    });

    return updatedAlert;
  }

  async delete(id: string): Promise<void> {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }
}
