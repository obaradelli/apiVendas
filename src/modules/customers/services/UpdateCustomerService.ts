import { getCustomRepository } from 'typeorm'

import AppError from '@shared/errors/AppError'
import Customer from '@modules/customers/typeorm/entities/Customer'
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository'

interface IRequest {
  id: string
  name: string
  email: string
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found.')
    }

    const customerExist = await customersRepository.findByEmail(email)

    if (customerExist && email !== customer.email) {
      throw new AppError('There is already one customer with this email.')
    }

    customer.name = name
    customer.email = email

    await customersRepository.save(customer)

    return customer
  }
}

export default UpdateCustomerService
