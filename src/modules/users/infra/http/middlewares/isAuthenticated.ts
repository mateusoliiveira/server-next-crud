import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/auth'
import { UnauthorizedError } from "@shared/errors/exceptions/unauthorized.error";

interface ITokenPayload {
  iat: string;
  exp: number;
  sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new UnauthorizedError({ body: { message: 'Token não encontrado' } })
  const [, token] = authHeader.split(' ');
  try {
    const decoded: unknown = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as ITokenPayload
    request.user = {
      id: sub
    }
    return next();
  } catch (error) {
    throw new UnauthorizedError({ body: { message: 'Token inválido' } })
  }

}
