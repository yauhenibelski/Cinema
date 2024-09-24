import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class IsAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request: Request & { user?: User } = context
			.switchToHttp()
			.getRequest();

		if ('user' in request) {
			const { user } = request;

			return user.isAdmin;
		}

		return false;
	}
}
