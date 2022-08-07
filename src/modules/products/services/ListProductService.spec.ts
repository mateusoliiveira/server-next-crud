import MockProductsRepository from "@modules/products/infra/typeorm/repositories/mocks/MockProductsRepository";
import CreateProductService from "./CreateProductService";
import ListProductService from "./ListProductService";

describe('ListProduct', () => {
  it('should list products', async () => {
    const mockProductsRepository = new MockProductsRepository();
    const createProduct = new CreateProductService(mockProductsRepository)
    const listProduct = new ListProductService(mockProductsRepository)
    await createProduct.execute({
      name: 'Camisa Verde I',
      price: 29.90,
      quantity: 200
    })
    await createProduct.execute({
      name: 'Camisa Verde II',
      price: 29.90,
      quantity: 200
    })
    await createProduct.execute({
      name: 'Camisa Verde III',
      price: 29.90,
      quantity: 200
    })
    const products = await listProduct.execute()
    expect(products).toHaveLength(3)
  })
})
