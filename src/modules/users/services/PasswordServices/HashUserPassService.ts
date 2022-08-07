import { hash } from "bcrypt";
export default class HashUserPassService {
  public async execute(password: string): Promise<string> {
    return await hash(password, 10)
  }
}
