import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { isHttpExceptionResponse } from "src/shared/guards/is-http-exception-response.guard";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal Server Error';

    const isDev = this.configService.get<string>('NODE_ENV') === 'development';
    const showStack = this.configService.get<string>('SHOW_ERROR_STACK') === 'true';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = isHttpExceptionResponse(res) ? res.message : exception.message;
    }

    const json: Record<string, unknown> = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    if (showStack && exception instanceof Error) {
      json.stack = exception.stack;
    }

    response.status(status).json(json);
  }
}
