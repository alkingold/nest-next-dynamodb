import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateAlertUseCase } from "../service/create-alert.usecase";
import { GetAlertsUseCase } from "../service/get-alerts.usecase";
import { UpdateAlertUseCase } from "../service/update-alert.usecase";
import { DeleteAlertUseCase } from "../service/delete-alert.usecase";
import { GetAlertUseCase } from "../service/get-alert.usecase";
import { CreateAlertDto } from "../dto/create-alert.dto";
import { UpdateAlertDto } from "../dto/update-alert.dto";
import { ParamsWithIdDto } from "../dto/params-id.dto";
import { AlertNotFoundError } from "../domain/errors/alert-not-found.error";

@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly createAlertUseCase: CreateAlertUseCase,
    private readonly getAlertUseCase: GetAlertUseCase,
    private readonly getAlertsUseCase: GetAlertsUseCase,
    private readonly updateAlertUseCase: UpdateAlertUseCase,
    private readonly deleteAlertUseCase: DeleteAlertUseCase,
  ) {}

  @Post()
  async createAlert(@Body() body: CreateAlertDto) {
    return this.createAlertUseCase.execute(body);
  }

  @Get(':id')
  async getAlertById(@Param() { id }: ParamsWithIdDto) {
    try {
      return await this.getAlertUseCase.execute(id);
    } catch (e) {
      if (e instanceof AlertNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Get()
  async getAlerts() {
    return this.getAlertsUseCase.execute();
  }

  @Patch(':id')
  async updateAlert(
    @Param() { id }: ParamsWithIdDto,
    @Body() body: UpdateAlertDto
  ) {
    try {
      return await this.updateAlertUseCase.execute(id, body);
    } catch (e) {
      if (e instanceof AlertNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Delete(':id')
  async deleteAlert(@Param() { id }: ParamsWithIdDto) {
    try {
      return await this.deleteAlertUseCase.execute(id);
    } catch (e) {
      if (e instanceof AlertNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }
}
