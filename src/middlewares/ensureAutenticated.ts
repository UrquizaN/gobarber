import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokentPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAutenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        
        const { sub } = decoded as TokentPayload;

        request.user = {
            id: sub,
        }

        return next();
    } catch {
        throw new Error('Invalid JWT token');
    }
}