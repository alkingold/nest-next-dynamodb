import { Inject, Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";

@Injectable()
export class GetAlertUseCase {
  constructor(
	@Inject('AlertRepositoryInterface')
	private readonly alertRepository:
	AlertRepositoryInterface
  ) {}

  async execute(id: string) {
	return this.alertRepository.findById(id);
  }
}
