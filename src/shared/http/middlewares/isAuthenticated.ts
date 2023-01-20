import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import authConfig from '../../../config/auth'
import AppError from '../../../shared/errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret)

    const { sub } = decodedToken as TokenPayload

    req.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token.')
  }
}
