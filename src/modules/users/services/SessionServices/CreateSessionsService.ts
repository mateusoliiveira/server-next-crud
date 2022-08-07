import CheckUserPassService from "../PasswordServices/CheckUserPassService";
import { sign } from 'jsonwebtoken'
import authConfig from '../../../../config/auth'
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateSession } from "@modules/users/domain/models/ICreateSession";
import { ICreatedSession } from "@modules/users/domain/models/ICreatedSession";
import { UnprocessableEntityError } from "@shared/errors/exceptions/unprocessable-entity.error";
import { NotFoundError } from "@shared/errors/exceptions/not-found.error";

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }
  public async execute({ email, password }: ICreateSession): Promise<ICreatedSession> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new NotFoundError({ body: { message: 'Usuário não encontrado' } })
    const checkPass = new CheckUserPassService();
    const passChecked: boolean = await checkPass.execute({ password, userPassword: user.password });
    if (!passChecked) throw new UnprocessableEntityError({ body: { message: 'Senha incorreta' } })
    const token: string = sign({}, authConfig.jwt.secret!, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })
    console.log(token)
    return { user, token };
  }
}
