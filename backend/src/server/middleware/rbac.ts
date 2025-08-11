import { Request, Response, NextFunction } from 'express';
import { Role } from './auth.js';

export function requireRole(allowed: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role || 'guest';
    if (!allowed.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}