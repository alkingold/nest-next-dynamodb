import { Inject, Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";
import { UpdateAlertDto } from "../dto/update-alert.dto";
import { AlertNotFoundError } from "../domain/errors/alert-not-found.error";

@Injectable()
export class UpdateAlertUseCase {
  constructor(
    @Inject('AlertRepositoryInterface')
    private readonly alertRepository:
    AlertRepositoryInterface
  ) {}

  async execute(id: string, alert: UpdateAlertDto) {
    const existingAlert = await this.alertRepository.findById(id);
    if (!existingAlert) throw new AlertNotFoundError(id);
    return this.alertRepository.update(id, alert);
  }
}
