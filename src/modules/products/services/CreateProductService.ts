import { UnprocessableEntityError } from "@shared/errors/exceptions/unprocessable-entity.error";
import { inject, injectable } from "tsyringe";
import RedisCache from "../../../shared/cache/RedisCache";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProduct } from "../domain/models/IProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {
  }
  public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const verifyIfExist = await this.productsRepository.findByName(name)
    if (verifyIfExist) throw new UnprocessableEntityError({ body: { message: 'Há um produto com este nome' } })
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')
    return await this.productsRepository.create({ name, price, quantity })
  }
}
