import MockProductsRepository from "@modules/products/infra/typeorm/repositories/mocks/MockProductsRepository";
import CreateProductService from "./CreateProductService";

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
    const mockProductsRepository = new MockProductsRepository();
    const createProduct = new CreateProductService(mockProductsRepository)
    const product = await createProduct.execute({
      name: 'Camisa Azul',
      price: 29.90,
      quantity: 200
    })
    expect(product).toHaveProperty('id')
  })
  it('should not be able to create two products with the same name', async () => {
    const mockProductsRepository = new MockProductsRepository();
    const createProduct = new CreateProductService(mockProductsRepository)
    await createProduct.execute({
      name: 'Camisa Verde',
      price: 29.90,
      quantity: 200
    })
    expect(createProduct.execute({
      name: 'Camisa Verde',
      price: 29.90,
      quantity: 200
    })).rejects.toBeInstanceOf(Error)
  })
})
