import { Inject, Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";
import { Alert } from "../domain/alert.entity";
import { CreateAlertDto } from "../dto/create-alert.dto";

@Injectable()
export class CreateAlertUseCase {
  constructor(
    @Inject('AlertRepositoryInterface')
    private readonly alertRepository: AlertRepositoryInterface,
  ) {}

  async execute(data: CreateAlertDto): Promise<Alert> {
    const alert = Alert.create(data);
    return this.alertRepository.create(alert);
  }
}
