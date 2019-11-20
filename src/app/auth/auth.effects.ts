import { Injectable } from '@angular/core';
import { ofType, createEffect } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';

@Injectable()

// this class should not be injected anywhere in our code. it's for the NgRx library
export class AuthEffects {
    constructor(private actions$) {
    }

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user',
                    JSON.stringify(action['user']))
                )
            )
        ,
        { dispatch: false });
}
