import { IDeleteUser } from "@modules/users/domain/models/IDeleteUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/exceptions/not-found.error";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute({ id }: IDeleteUser): Promise<number> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundError({ body: { message: `Usuário ${id} não encontrado` } });
    return await this.usersRepository.remove(user);
  }
}
