import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUsersRepository {
  persist({ name, email, password }: ICreateUser): Promise<IUser>
  remove(product: IUser): Promise<number>
  find(): Promise<IUser[]>
  findByName(name: string): Promise<IUser | undefined>
  findById(id: string): Promise<IUser | undefined>
  findByEmail(email: string): Promise<IUser | undefined>
}
