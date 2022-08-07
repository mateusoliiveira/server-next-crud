import MockProductsRepository from "@modules/products/infra/typeorm/repositories/mocks/MockProductsRepository";
import CreateProductService from "./CreateProductService";
import DeleteProductService from "./DeleteProductService";

describe('DeleteProduct', () => {
  it('should delete a product', async () => {
    const mockProductsRepository = new MockProductsRepository();
    const createProduct = new CreateProductService(mockProductsRepository)
    const deleteProduct = new DeleteProductService(mockProductsRepository)
    const { id } = await createProduct.execute({
      name: 'Camisa Azul',
      price: 29.90,
      quantity: 200
    })
    const deleted = await deleteProduct.execute({ id })
    expect(deleted).toEqual(0)
  })
})
