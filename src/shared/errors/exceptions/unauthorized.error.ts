
import { ApplicationError } from '../application.error'

export class UnauthorizedError extends ApplicationError<Error> {
  statusCode: number = 401

}

