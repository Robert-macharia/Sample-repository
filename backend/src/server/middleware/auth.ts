import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type Role = 'patient' | 'caregiver' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';

export function authenticateUserFromJwt(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = { id: 'guest', name: 'Guest', role: 'guest' };
    return next();
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, jwtSecret) as AuthUser;
    req.user = payload;
  } catch (_e) {
    req.user = { id: 'guest', name: 'Guest', role: 'guest' };
  }
  next();
}

export function signJwt(user: AuthUser): string {
  return jwt.sign(user, jwtSecret, { expiresIn: '7d' });
}