import { Inject, Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";

@Injectable()
export class DeleteAlertUseCase {
  constructor(
    @Inject('AlertRepositoryInterface')
    private readonly alertRepository:
    AlertRepositoryInterface
  ) {}

  async execute(id: string) {
    this.alertRepository.delete(id);
  }
}
