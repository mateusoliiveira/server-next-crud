
import { ApplicationError } from '../application.error'

export class ForbiddenError extends ApplicationError<Error> {
  statusCode: number = 403

}

