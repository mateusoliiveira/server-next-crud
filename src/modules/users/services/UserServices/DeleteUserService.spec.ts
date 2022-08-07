import MockUsersRepository from "@modules/users/infra/typeorm/repositories/mocks/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import DeleteUserService from "./DeleteUserService";

describe('DeleteUser', () => {
  it('should delete an user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const createUser = new CreateUserService(mockUsersRepository)
    const deleteUser = new DeleteUserService(mockUsersRepository)
    const { id } = await createUser.execute({
      name: 'Mateus Morais',
      email: 'mateus@gmail.com',
      password: '198022'
    })
    const deleted = deleteUser.execute({ id })
    expect(deleted).toBeTruthy()
  })
})
