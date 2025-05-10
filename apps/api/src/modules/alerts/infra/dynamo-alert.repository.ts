import { Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";
import { Alert } from "../domain/alert.entity";
import { UpdateAlertDto } from "../dto/update-alert.dto";

@Injectable()
export class DynamoAlertRepository implements AlertRepositoryInterface {
  async create(alert: Alert): Promise<Alert> {
    return alert;
  }

  async findAll(): Promise<Alert[]> {
    return [];
  }

  async findById(id: string): Promise<Alert | null> {
    return null;
  }

  async update(id: string, alert: UpdateAlertDto): Promise<Alert | null> {
    // to be implemented
    return null;
  }

  async delete(id: string): Promise<void> {

  }
}
