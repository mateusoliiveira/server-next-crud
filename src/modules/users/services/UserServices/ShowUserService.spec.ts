import MockUsersRepository from "@modules/users/infra/typeorm/repositories/mocks/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import ShowUserService from "./ShowUserService";

describe('ShowUser', () => {
  it('should be able to create a new user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const createUser = new CreateUserService(mockUsersRepository)
    const showUser = new ShowUserService(mockUsersRepository)
    const created = await createUser.execute({
      name: 'Mateus Morais',
      email: 'mateus@gmail.com',
      password: '198022'
    })
    const user = await showUser.execute({ id: created.id })
    expect(user).toHaveProperty('id')
    expect(user?.email).toEqual('mateus@gmail.com')
  })
})
