import { ApplicationError } from "../application.error"

export class UnprocessableEntityError extends ApplicationError<Error> {
  statusCode: number = 422
}
