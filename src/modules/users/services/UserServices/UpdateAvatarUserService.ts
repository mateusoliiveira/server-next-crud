import path from "path";
import uploadConfig from "../../../../config/upload"
import fs from 'fs'
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUpdateAvatar } from "@modules/users/domain/models/IUpdateAvatar";
import { NotFoundError } from "@shared/errors/exceptions/not-found.error";

@injectable()
export default class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute({ userId, avatarFileName }: IUpdateAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundError({ body: { message: 'Usuário não encontrado' } });

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName
    return await this.usersRepository.persist(user)
  }
}
