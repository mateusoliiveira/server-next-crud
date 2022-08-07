import { NotFoundError } from "@shared/errors/exceptions/not-found.error";
import { inject, injectable } from "tsyringe";
import RedisCache from "../../../shared/cache/RedisCache";
import { IDeleteProduct } from "../domain/models/IDeleteProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {
  }
  public async execute({ id }: IDeleteProduct): Promise<number> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new NotFoundError({ body: { message: `Produto ${id} não encontrado` } });
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')
    return await this.productsRepository.remove(product);
  }
}
