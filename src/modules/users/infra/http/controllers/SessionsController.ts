import CreateSessionsService from "@modules/users/services/SessionServices/CreateSessionsService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionsController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { email, password } = request.body;
    const createSession = container.resolve(CreateSessionsService);
    try {
      const user = await createSession.execute(
        { email, password })
      return response.json(user);
    } catch (error) {
      next(error)
    }
  }
}
