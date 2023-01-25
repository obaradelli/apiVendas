import { Request, Response } from 'express'

import ListCustomerService from '@modules/customers/services/ListCustomerService'
import ShowCustomerService from '@modules/customers/services/ShowCustomerService'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService'
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService'

export default class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomer = new ListCustomerService()

    const customers = await listCustomer.execute()

    return res.json(customers)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const showCustomer = new ShowCustomerService()

    const costumer = await showCustomer.execute({ id })

    return res.json(costumer)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const createCustomer = new CreateCustomerService()

    const customer = await createCustomer.execute({ name, email })

    return res.json(customer)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body
    const { id } = req.params

    const updateCustomer = new UpdateCustomerService()

    const customer = await updateCustomer.execute({ id, name, email })

    return res.json(customer)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const deleteCustomer = new DeleteCustomerService()

    await deleteCustomer.execute({ id })

    return res.json([])
  }
}
