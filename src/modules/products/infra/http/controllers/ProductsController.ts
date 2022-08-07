import CreateProductService from "@modules/products/services/CreateProductService";
import DeleteProductService from "@modules/products/services/DeleteProductService";
import ListProductService from "@modules/products/services/ListProductService";
import ShowProductService from "@modules/products/services/ShowProductService";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export default class ProductsController {
  public async index(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const listProducts = container.resolve(ListProductService);
    try {
      return response.json(await listProducts.execute());
    } catch (error) {
      next(error)
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;
    const showProducts = container.resolve(ShowProductService);
    try {
      return response.json(await showProducts.execute({ id }));
    } catch (error) {
      next(error)
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const createProducts = container.resolve(CreateProductService);
    try {
      return response.status(201).json(await createProducts.execute({ ...request.body }));
    } catch (error) {
      next(error)
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;
    const updateProducts = container.resolve(UpdateProductService);
    try {
      return response.status(201).json(await updateProducts.execute({ ...request.body, id }));
    } catch (error) {
      next(error)
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;
    const deleteProducts = container.resolve(DeleteProductService);
    try {
      return response.json(await deleteProducts.execute({ id }));
    } catch (error) {
      next(error)
    }
  }
}
