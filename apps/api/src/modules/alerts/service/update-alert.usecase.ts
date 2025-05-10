import { Inject, Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";
import { UpdateAlertDto } from "../dto/update-alert.dto";

@Injectable()
export class UpdateAlertUseCase {
  constructor(
    @Inject('AlertRepositoryInterface')
    private readonly alertRepository:
    AlertRepositoryInterface
  ) {}

  async execute(id: string, alert: UpdateAlertDto) {
    return this.alertRepository.update(id, alert);
  }
}
