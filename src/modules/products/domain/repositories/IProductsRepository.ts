import { IUpdateProduct } from "../models/IUpdateProduct";
import { IProduct } from "../models/IProduct";
import { ICreateProduct } from "../models/ICreateProduct";

export interface IProductsRepository {
  create({ name, price, quantity }: ICreateProduct): Promise<IProduct>
  update({ id, name, price, quantity }: IUpdateProduct): Promise<IProduct>
  remove(product: IProduct): Promise<number>
  findAll(): Promise<IProduct[] | null>
  findByName(name: string): Promise<IProduct | undefined>
  findById(id: string): Promise<IProduct | undefined>
}
