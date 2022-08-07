import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UnprocessableEntityError } from "@shared/errors/exceptions/unprocessable-entity.error";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const verifyIfExist = await this.usersRepository.findByEmail(email)
    if (verifyIfExist) throw new UnprocessableEntityError({ body: { message: 'Há um usuário com este email' } })
    return await this.usersRepository.persist({ name, email, password })
  }
}
