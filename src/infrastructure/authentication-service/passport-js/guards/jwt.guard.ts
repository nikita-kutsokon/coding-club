import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly _reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): Promise<boolean> | boolean | Observable<boolean> {
        const isPublic = this._reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}
