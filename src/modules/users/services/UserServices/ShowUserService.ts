import { IShowUser } from "@modules/users/domain/models/IShowUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/exceptions/not-found.error";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute({ id }: IShowUser): Promise<IUser | undefined> {
    const user = this.usersRepository.findById(id);
    if (!user) throw new NotFoundError({ body: { message: `Usuário ${id} não encontrado` } });
    return user
  }
}
