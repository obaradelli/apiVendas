import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'
import { Router } from 'express'

import CustomersController from '../controllers/CustomersController'

const costumersRouter = Router()
const customersController = new CustomersController()

costumersRouter.use(isAuthenticated)
costumersRouter.get('/', customersController.index)

costumersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
)

costumersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create,
)

costumersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
)

costumersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
)

export default costumersRouter
