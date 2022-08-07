import { NotFoundError } from "@shared/errors/exceptions/not-found.error";
import { inject, injectable } from "tsyringe";
import { IProduct } from "../domain/models/IProduct";
import { IShowProduct } from "../domain/models/IShowProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
export default class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {
  }
  public async execute({ id }: IShowProduct): Promise<IProduct | undefined> {
    const product = this.productsRepository.findById(id);
    if (!product) throw new NotFoundError({ body: { message: `Produto ${id} não encontrado` } });
    return product
  }
}
