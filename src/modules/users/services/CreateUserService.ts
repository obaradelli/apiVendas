import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '@modules/users/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
