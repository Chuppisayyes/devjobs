import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware {
  static create(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Bạn Cần Đăng nhập Vào Hệ thống ');
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRole = decoded['quyen'];

        if (!allowedRoles.includes(userRole)) {
          throw new ForbiddenException(
            'You do not have permission to access this resource',
          );
        }
        next();
      } catch (err) {
        console.log(err);
        throw new UnauthorizedException('Invalid or expired token');
      }
    };
  }
}
