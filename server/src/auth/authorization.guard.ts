/* eslint-disable prettier/prettier */
// auth/authorization.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if (user.role === 'admin') {
      return true;
    }
    return false;
  }
}
