import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  // Auth Validator
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.get('authorization');

    if (authorization === process.env.API_AUTHORIZATION) return true;
    else throw new UnauthorizedException({ errorMessage: 'unauthorized' });
  }
}