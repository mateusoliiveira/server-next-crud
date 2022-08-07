import MockProductsRepository from "@modules/products/infra/typeorm/repositories/mocks/MockProductsRepository";
import CreateProductService from "./CreateProductService";
import ShowProductService from "./ShowProductService";

describe('ShowProduct', () => {
  it('should be able to show a product', async () => {
    const mockProductsRepository = new MockProductsRepository();
    const createProduct = new CreateProductService(mockProductsRepository)
    const showProduct = new ShowProductService(mockProductsRepository)
    const created = await createProduct.execute({
      name: 'Camisa Verde',
      price: 29.90,
      quantity: 200
    })
    const product = await showProduct.execute({ id: created.id })
    expect(product).toHaveProperty('id')
    expect(product?.name).toEqual('Camisa Verde')
  })
})
