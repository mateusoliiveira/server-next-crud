import { container } from 'tsyringe'
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
