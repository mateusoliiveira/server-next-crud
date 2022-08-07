import MockProductsRepository from "@modules/products/infra/typeorm/repositories/mocks/MockProductsRepository";
import CreateProductService from "./CreateProductService";
import ShowProductService from "./ShowProductService";
import UpdateProductService from "./UpdateProductService";

describe('UpdateProduct', () => {
  it('should be able to update a created product', async () => {
    const mockProductsRepository = new MockProductsRepository();
    const createProduct = new CreateProductService(mockProductsRepository)
    const updateProduct = new UpdateProductService(mockProductsRepository)
    const showProduct = new ShowProductService(mockProductsRepository)
    const product = await createProduct.execute({
      name: 'Camisa Preta',
      price: 29.90,
      quantity: 200
    })
    expect(product).toHaveProperty('id')
    expect(product?.name).toEqual('Camisa Preta')
    await updateProduct.execute({
      id: product.id, name: 'Camisa Rosa', price: 39.90, quantity: 149
    })
    const productEdited = await showProduct.execute({ id: product.id })
    expect(productEdited?.name).toEqual('Camisa Rosa')
  })
})
