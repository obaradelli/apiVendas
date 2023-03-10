import { getCustomRepository } from 'typeorm'

import AppError from '@shared/errors/AppError'
import Customer from '@modules/customers/typeorm/entities/Customer'
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository'

interface IRequest {
  id: string
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found.')
    }

    return customer
  }
}

export default ShowCustomerService
