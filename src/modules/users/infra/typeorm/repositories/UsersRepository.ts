import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User)
  }
  public async persist({ name, email, password }: ICreateUser): Promise<IUser> {
    return await this.ormRepository.save({ name, email, password })
  }
  public async remove(product: User): Promise<any> {
    return await this.ormRepository.remove(product)
  }
  public async find(): Promise<User[]> {
    return await this.ormRepository.find()
  }
  public async findById(id: string): Promise<IUser | undefined> {
    return await this.ormRepository.findOne({
      where: { id }
    })
  }
  public async findByEmail(email: string): Promise<IUser | undefined> {
    return await this.ormRepository.findOne({
      where: { email }
    })
  }
  public async findByName(name: string): Promise<IUser | undefined> {
    return await this.ormRepository.findOne({
      where: { name }
    })
  }
}
