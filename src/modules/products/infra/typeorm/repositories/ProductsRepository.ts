import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>
  constructor() {
    this.ormRepository = getRepository(Product)
  }
  public async create({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    return await this.ormRepository.save({ name, price, quantity })
  }
  public async update({ id, name, price, quantity }: IUpdateProduct): Promise<IProduct> {
    return await this.ormRepository.save({ id, name, price, quantity })
  }
  public async remove(product: Product): Promise<any> {
    return await this.ormRepository.remove(product)
  }
  public async findAll(): Promise<IProduct[] | null> {
    return await this.ormRepository.find()
  }
  public async findById(id: string): Promise<IProduct | undefined> {
    return await this.ormRepository.findOne(id)
  }
  public async findByName(name: string): Promise<IProduct | undefined> {
    return await this.ormRepository.findOne({
      where: { name }
    })
  }
}
