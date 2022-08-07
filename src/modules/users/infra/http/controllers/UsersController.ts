import HashUserPassService from "@modules/users/services/PasswordServices/HashUserPassService";
import CreateUserService from "@modules/users/services/UserServices/CreateUserService";
import DeleteUserService from "@modules/users/services/UserServices/DeleteUserService";
import ListUserService from "@modules/users/services/UserServices/ListUserService";
import ShowUserService from "@modules/users/services/UserServices/ShowUserService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";


export default class UsersController {
  public async index(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const listUsers = container.resolve(ListUserService);
    try {
      return response.json(await listUsers.execute());
    } catch (error) {
      next(error)
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;
    const showUsers = container.resolve(ShowUserService);
    try {
      return response.json(await showUsers.execute({ id }));
    } catch (error) {
      next(error)
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const createUsers = container.resolve(CreateUserService);
    const hashUserPass = new HashUserPassService();
    try {
      const password = await hashUserPass.execute(request.body.password)
      return response.status(201).json(
        await createUsers.execute({
          ...request.body,
          password
        }));
    } catch (error) {
      next(error)
    }

  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;
    const deleteUsers = container.resolve(DeleteUserService);
    try {
      return response.json(await deleteUsers.execute({ id }));
    } catch (error) {
      next(error)
    }
  }
}
