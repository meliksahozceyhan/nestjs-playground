import { HttpException, HttpStatus } from '@nestjs/common'

export class EntityNotListedException extends HttpException {
  constructor(entityName: string) {
    const message = `"${entityName}" entity is not decorated with the ClassMetadata decorator`
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
