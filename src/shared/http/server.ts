import 'reflect-metadata'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'

import { errors } from 'celebrate'
import routes from '@shared/http/routes'
import cors from 'cors'

import '@shared/typeorm'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

const app = express()

app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))

app.use(errors())
app.use(cors())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆')
})
