import { Inject, Injectable } from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";

@Injectable()
export class GetAlertsUseCase {
  constructor(
	@Inject('AlertRepositoryInterface')
	private readonly alertRepository:
	AlertRepositoryInterface
  ) {}

  async execute() {
	return this.alertRepository.findAll();
  }
}
