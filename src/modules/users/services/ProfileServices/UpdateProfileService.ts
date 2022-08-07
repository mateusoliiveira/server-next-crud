import { IUpdateProfile } from "@modules/users/domain/models/IUpdateProfile";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UnprocessableEntityError } from "@shared/errors/exceptions/unprocessable-entity.error";
import { NotFoundError } from "@shared/errors/exceptions/not-found.error";
import { inject, injectable } from "tsyringe";
import CheckUserPassService from "../PasswordServices/CheckUserPassService";
import HashUserPassService from "../PasswordServices/HashUserPassService";


@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute({ id, name, email, password, old_password }: IUpdateProfile): Promise<IUser> {
    const hashPass = new HashUserPassService();
    const checkPass = new CheckUserPassService();
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundError({ body: { message: `Usuário ${id} não encontrado` } });
    const userExistEmail = await this.usersRepository.findByEmail(email);
    if (userExistEmail && userExistEmail.id !== id) throw new UnprocessableEntityError({ body: { message: `Já existe um usuário com este email` } });
    if (password && !old_password) throw new UnprocessableEntityError({ body: { message: `A senha atual e a nova senha são requeridas.` } });
    if (password && old_password) {
      const passChecked: boolean = await checkPass.execute({ password: old_password, userPassword: user.password });
      if (!passChecked) throw new UnprocessableEntityError({ body: { message: 'Senha antiga incorreta' } })
      user.password = await hashPass.execute(password)
    }
    user.name = name
    user.email = email
    return await this.usersRepository.persist(user)
  }
}
