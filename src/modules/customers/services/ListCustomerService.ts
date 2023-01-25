import { getCustomRepository } from 'typeorm'

import UseCustomer from '@modules/customers/typeorm/entities/Customer'
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository'

class ListCustomerService {
  public async execute(): Promise<UseCustomer[]> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customers = customersRepository.find()

    return customers
  }
}

export default ListCustomerService
