import { Injectable } from "@angular/core";
import { catchError, switchMap, map, tap } from "rxjs";
import { of } from 'rxjs'
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";


import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { registerAction, registerSuccessAction, registerFailureAction } from "../actions/register.action";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { Router } from "@angular/router";


@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ request }) => {
      return this.authService.register(request)
        .pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return registerSuccessAction({ currentUser })
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(registerFailureAction({ errors: errorResponce.error.errors }))
          })
        )
    })
  ));

  redirectAfterSubmit$ = createEffect(
    () => this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        console.log('success');
        this.router.navigateByUrl('/')
      })
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {
  }
}