import { ApplicationError } from '../application.error'

export class DatabaseError extends ApplicationError<Error> {
  statusCode: number = 500
}
