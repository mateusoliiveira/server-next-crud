import { ApplicationError } from "../application.error"

export class BadRequestError extends ApplicationError<Error> {
  statusCode: number = 400
}
