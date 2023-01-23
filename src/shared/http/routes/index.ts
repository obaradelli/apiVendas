import { Router } from 'express'

import usersRouter from '@modules/users/routes/users.routes'
import passwordRouter from '@modules/users/routes/password.routes'
import sessionsRouter from '@modules/users/routes/sessions.routes'
import productsRouter from '@modules/products/routes/products.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)

export default routes
