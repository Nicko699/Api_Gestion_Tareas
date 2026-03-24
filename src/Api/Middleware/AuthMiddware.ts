import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../../Config/env.config.js";
import { GlobalException } from "../../Exception/GlobalException.js";

const SECRET = Buffer.from(envConfig.jwtSecret, "utf-8");

/**
 * Middleware de autenticación JWT.
 * 
 * Este middleware:
 * - Verifica que exista el header Authorization con formato Bearer token
 * - Valida la firma y expiración del JWT
 * - Si el token es válido, agrega el payload en req.user
 * - Si el token es inválido o no existe, lanza excepción 401
 * 
 * Header esperado:
 * Authorization: Bearer <token>
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {

    next(GlobalException.unauthorizedException("Token de autenticación inválido"));

    return;
  }

  const token = authHeader.substring(7);

  try {

    const payload = jwt.verify(token, SECRET) as unknown as { sub: number; email: string };

    req.user = payload;
    next();

  } catch {
    next(GlobalException.unauthorizedException("Token inválido o expirado"));
  }
}