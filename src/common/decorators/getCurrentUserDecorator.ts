import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/types/currentUser.type';

export const GetCurrentUser = createParamDecorator(
  (data: keyof CurrentUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as CurrentUser;

    return data ? user?.[data] : user;
  },
);