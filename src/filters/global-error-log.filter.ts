import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(Error)
export class GlobalErrorLogFilter implements ExceptionFilter<Error> {
  constructor(@Inject() private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()
    const status = HttpStatus.INTERNAL_SERVER_ERROR

    this.logger.error(exception.message)

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
        detail: exception.stack
      })
      .send()
  }
}
