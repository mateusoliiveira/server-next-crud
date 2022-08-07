import MockUsersRepository from "@modules/users/infra/typeorm/repositories/mocks/MockUsersRepository";
import CreateUserService from "../UserServices/CreateUserService";
import CreateSessionsService from "./CreateSessionsService";

describe('CreateSession', () => {
  it('should be able to login a user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const createUser = new CreateUserService(mockUsersRepository)
    const createSession = new CreateSessionsService(mockUsersRepository)
    await createUser.execute({
      name: "Mateus Morais",
      email: 'mateus@gmail.com',
      password: '198022'
    })
    const session = await createSession.execute({
      email: 'mateus@gmail.com',
      password: '198022'
    })
    expect(session).toHaveProperty('token')
  })
})
