import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
  name: string;
  email: string;
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthUser => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;

  // console.log('LOGGED USER: ', req.auth);

  return req.auth;

})
