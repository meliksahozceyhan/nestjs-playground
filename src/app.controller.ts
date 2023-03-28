import { Controller, Get } from '@nestjs/common'
import { Cat } from './api/cat/entities/cat.entity'
import { AppService } from './app.service'
import { WinstonLoggerService } from './winston-logger/winston-logger.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: WinstonLoggerService) {}

  @Get()
  getHello(): string {
    this.logger.log('Calling getHello()', AppController.name)

    const optionalParamArray = { context: AppController.name, class: AppService.name, user: 'User1' }

    this.logger.warn('Hello Darkness My Old friend', optionalParamArray)

    return this.appService.getHello()
  }
}
