import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    username: string;
  };
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        req.user = decoded as { userId: number, username: string };
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid token' });
    }
} 

export default authenticate;