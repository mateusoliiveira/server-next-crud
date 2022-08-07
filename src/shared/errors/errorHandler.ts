import { NextFunction, Request, Response } from "express"
import HttpResponse from "@shared/errors/http-response.model"
import { ApplicationError } from "./application.error"


const UNEXPECTED_ERROR = new HttpResponse<void>(500, {
  error: "Unexpected Error",
  message: "Try again later.",
})

const BAD_REQUEST_ERROR = new HttpResponse<void>(400, {
  error: "Bad Request",
  message: "Request can't be completed",
})

const UNAUTHORIZED_ERROR = new HttpResponse<void>(401, {
  error: "Unauthorized",
  message: "Not authed.",
})

const FORBIDDEN_ERROR = new HttpResponse<void>(403, {
  error: "Forbidden",
  message: "Not permitted.",
})

const NOT_FOUND_ERROR = new HttpResponse<void>(404, {
  error: "Not Found",
  message: "Not found.",
})

const UNPROCESSABLE_ENTITY = new HttpResponse<void>(422, {
  error: "Unprocessable Entity",
  message: "Validation Failed.",
})

const errorHanddlerMiddleware = (
  error: ApplicationError<Error>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { statusCode } = error
  const statusCodingError: { [x: number]: HttpResponse<void> } = {
    400: BAD_REQUEST_ERROR,
    401: UNAUTHORIZED_ERROR,
    403: FORBIDDEN_ERROR,
    404: NOT_FOUND_ERROR,
    422: UNPROCESSABLE_ENTITY
  }
  let errorResponse = statusCodingError[statusCode] ?? UNEXPECTED_ERROR
  return response.status(errorResponse.statusCode).send({ ...errorResponse.body, ...error })
}

export default errorHanddlerMiddleware
