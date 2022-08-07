import MockUsersRepository from "@modules/users/infra/typeorm/repositories/mocks/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import ListUserService from "./ListUserService";

describe('ListUser', () => {
  it('should list users', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const createUser = new CreateUserService(mockUsersRepository)
    const listUser = new ListUserService(mockUsersRepository)
    await createUser.execute({
      name: 'Mateus Morais 1',
      email: 'mateus1@gmail.com',
      password: '198022'
    })
    await createUser.execute({
      name: 'Mateus Morais 2',
      email: 'mateus2@gmail.com',
      password: '198022'
    })
    await createUser.execute({
      name: 'Mateus Morais 3',
      email: 'mateus3@gmail.com',
      password: '198022'
    })
    const users = await listUser.execute()
    expect(users).toHaveLength(3)
  })
})
