import {
	Inject,
  Injectable
} from "@nestjs/common";
import { AlertRepositoryInterface } from "../domain/alert.repository.interface";
import { AlertNotFoundError } from "../domain/errors/alert-not-found.error";

@Injectable()
export class GetAlertUseCase {
  constructor(
    @Inject('AlertRepositoryInterface')
    private readonly alertRepository:
    AlertRepositoryInterface
  ) {}

  async execute(id: string) {
    const alert = await this.alertRepository.findById(id);
    if (!alert) throw new AlertNotFoundError(id);
    return alert;
  }
}
