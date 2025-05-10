import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateAlertUseCase } from "../service/create-alert.usecase";
import { GetAlertsUseCase } from "../service/get-alerts.usecase";
import { UpdateAlertUseCase } from "../service/update-alert.usecase";
import { DeleteAlertUseCase } from "../service/delete-alert.usecase";
import { GetAlertUseCase } from "../service/get-alert.usecase";
import { CreateAlertDto } from "../dto/create-alert.dto";
import { UpdateAlertDto } from "../dto/update-alert.dto";

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
  async getAlertById(@Param('id') id: string) {
    return this.getAlertUseCase.execute(id);
  }

  @Get()
  async getAlerts() {
    return this.getAlertsUseCase.execute();
  }

  @Put(':id')
  async updateAlert(
    @Param('id') id: string,
    @Body() body: UpdateAlertDto
  ) {
    return this.updateAlertUseCase.execute(id, body);
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string) {
    return this.deleteAlertUseCase.execute(id);
  }
}
