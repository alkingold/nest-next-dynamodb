import { Module } from '@nestjs/common';
import { AlertsController } from './controllers/alerts.controller';
import { CreateAlertUseCase } from './service/create-alert.usecase';
// import { DynamoAlertRepository } from './infra/dynamo-alert.repository';
import { InMemoryAlertRepository } from './infra/in-memory-alert.repository';
import { GetAlertsUseCase } from './service/get-alerts.usecase';
import { UpdateAlertUseCase } from './service/update-alert.usecase';
import { DeleteAlertUseCase } from './service/delete-alert.usecase';
import { GetAlertUseCase } from './service/get-alert.usecase';

@Module({
  controllers: [AlertsController],
  providers: [
    CreateAlertUseCase,
    GetAlertUseCase,
    GetAlertsUseCase,
    UpdateAlertUseCase,
    DeleteAlertUseCase,
    // DynamoAlertRepository,
    InMemoryAlertRepository,
    {
      // inject dependencies and respect interface
      provide: 'AlertRepositoryInterface',
      // useExisting: DynamoAlertRepository,
      useClass: InMemoryAlertRepository,
    }
  ],
})
export class AlertsModule {}
