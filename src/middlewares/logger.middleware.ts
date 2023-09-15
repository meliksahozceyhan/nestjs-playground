import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { WinstonLoggerService } from 'src/winston-logger/winston-logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: WinstonLoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      /**
       * TODO: Add JWT signature decode for the getting the user from the request header and find a way to get The execution context and reach the class that going to be executed.
       *
       *
       */
      this.logger.log(req.body)
    }
    next()
  }
}
