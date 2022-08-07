import { randomUUID } from 'crypto';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import User from '../../entities/User';
import { IUser } from '@modules/users/domain/models/IUser';
import HashUserPassService from '@modules/users/services/PasswordServices/HashUserPassService';


export default class MockUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async persist({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User()
    const hashed = new HashUserPassService();
    const passHashed = await hashed.execute(password)
    user.id = randomUUID()
    user.name = name
    user.email = email
    user.password = passHashed
    this.users.push(user)
    return user
  }
  public async remove(user: IUser): Promise<number> {
    const removed = this.users.filter(c => c.id !== user.id)
    return removed.length
  }
  public async find(): Promise<IUser[]> {
    return this.users ?? undefined
  }
  public async findByName(name: string): Promise<IUser | undefined> {
    return this.users.find(user => user.name === name) ?? undefined
  }
  public async findById(id: string): Promise<IUser | undefined> {
    return this.users.find(user => user.id === id) ?? undefined
  }
  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email) ?? undefined
  }
}
