import { getCustomRepository } from 'typeorm'

import UseCustomer from '.././typeorm/entities/Customer'
import CustomersRepository from '../typeorm/repositories/CustomersRepository'

class ListCustomerService {
  public async execute(): Promise<UseCustomer[]> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customers = customersRepository.find()

    return customers
  }
}

export default ListCustomerService
