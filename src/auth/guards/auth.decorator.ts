import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from './is-admin.guard';

export const Auth = (role: 'admin' | 'user' = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(AuthGuard, IsAdminGuard)
			: UseGuards(AuthGuard),
	);
