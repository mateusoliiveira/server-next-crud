import MockUsersRepository from "@modules/users/infra/typeorm/repositories/mocks/MockUsersRepository";
import CreateUserService from "./CreateUserService";

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const createUser = new CreateUserService(mockUsersRepository)
    const user = await createUser.execute({
      name: 'Mateus Morais',
      email: 'mateus@gmail.com',
      password: '198022'
    })
    expect(user).toHaveProperty('id')
  })
  it('should not be able to create two users with the same email', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const createUser = new CreateUserService(mockUsersRepository)
    await createUser.execute({
      name: 'Mateus Morais',
      email: 'mateus@gmail.com',
      password: '198022'

    })
    expect(createUser.execute({
      name: 'Mateus Morais',
      email: 'mateus@gmail.com',
      password: '198022'
    })).rejects.toBeInstanceOf(Error)
  })
})
