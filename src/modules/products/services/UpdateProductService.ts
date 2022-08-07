import { NotFoundError } from "@shared/errors/exceptions/not-found.error";
import { inject, injectable } from "tsyringe";
import RedisCache from "../../../shared/cache/RedisCache";
import { IProduct } from "../domain/models/IProduct";
import { IPersistProduct } from "../domain/models/IUpdateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {
  }
  public async execute({ id, name, price, quantity }: IPersistProduct): Promise<IProduct> {
    let productExist = await this.productsRepository.findById(id);
    if (!productExist) throw new NotFoundError({ body: { message: `Produto ${id} não encontrado` } });
    productExist.name = name
    productExist.price = price
    productExist.quantity = quantity
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')
    return await this.productsRepository.update(productExist)
  }
}
