import { ApplicationError } from "../application.error"

export class NotFoundError extends ApplicationError<Error> {
  statusCode: number = 404
}
