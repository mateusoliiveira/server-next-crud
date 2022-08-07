import UpdateAvatarUserService from "@modules/users/services/UserServices/UpdateAvatarUserService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export default class MediaController {
  public async update(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarUserService);
    try {
      return response.status(201).json(await updateAvatar.execute({
        userId: request.user.id,
        avatarFileName: request.file.filename
      }));
    } catch (error) {
      next(error)
    }

  }
}
