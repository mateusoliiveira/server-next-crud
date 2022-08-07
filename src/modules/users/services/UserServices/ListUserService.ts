import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute(): Promise<IUser[]> {
    return await this.usersRepository.find()
  }
}
