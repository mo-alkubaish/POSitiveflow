import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../users/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { AuthGuard } from '../auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authGuard: AuthGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (! await this.authGuard.canActivate(context)) {
      return false;
    }

    // If no role is required, allow access
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userRole = request['user'].role;

    // Check if the user's role matches the required role
    return requiredRole.includes(userRole);
  }
}