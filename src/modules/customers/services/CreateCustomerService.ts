import { getCustomRepository } from 'typeorm'

import Customer from '@modules/customers/typeorm/entities/Customer'
import AppError from '@shared/errors/AppError'
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository'

interface IRequest {
  name: string
  email: string
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)
    const emailExists = await customersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const customer = customersRepository.create({
      name,
      email,
    })

    await customersRepository.save(customer)

    return customer
  }
}

export default CreateCustomerService
