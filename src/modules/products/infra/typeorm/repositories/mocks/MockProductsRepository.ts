import { randomUUID } from 'crypto';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '../../entities/Product';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct';


export default class MockProductsRepository implements IProductsRepository {
  private products: Product[] = []

  public async create({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const product = new Product()
    product.id = randomUUID()
    product.name = name
    product.price = price
    product.quantity = quantity
    this.products.push(product)
    return product
  }

  public async remove(product: IProduct): Promise<number> {
    const removed = this.products.filter(c => c.id !== product.id)
    return removed.length
  }
  public async findAll(): Promise<IProduct[]> {
    return this.products ?? undefined
  }
  public async findById(id: string): Promise<IProduct | undefined> {
    return this.products.find(product => product.id === id) ?? undefined
  }
  public async findByName(name: string): Promise<IProduct | undefined> {
    return this.products.find(product => product.name === name) ?? undefined
  }
}
