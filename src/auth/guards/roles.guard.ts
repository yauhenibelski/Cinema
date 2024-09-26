import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RoleType, Roles as RolesTypeArr } from 'src/types/roles.type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesTypeArr) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isAuthenticated = await super.canActivate(context);

        if (!isAuthenticated) {
            return false;
        }
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some((role: RoleType) =>
            user.roles?.includes(role),
        );
    }
}
