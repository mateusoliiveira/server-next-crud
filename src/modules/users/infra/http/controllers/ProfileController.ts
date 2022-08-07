import UpdateProfileService from "@modules/users/services/ProfileServices/UpdateProfileService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({ user: request.user.id });
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService)
    try {
      return response.json(await updateProfile.execute({ id: request.user.id, ...request.body }));
    } catch (error) {
      next(error)
    }
  }
}
