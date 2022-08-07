import { compare } from "bcrypt";

interface IHashPayload {
  password: string;
  userPassword: string;
}

export default class CheckUserPassService {
  public async execute(payload: IHashPayload): Promise<boolean> {
    return await compare(payload.password, payload.userPassword)
  }
}
