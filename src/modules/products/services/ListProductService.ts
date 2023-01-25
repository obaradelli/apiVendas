import { getCustomRepository } from 'typeorm'

import Product from '@modules/products/typeorm/entities/Product'
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository'

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository)

    const products = productsRepository.find()

    return products
  }
}

export default ListProductService
