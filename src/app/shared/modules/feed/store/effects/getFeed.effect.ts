import { Injectable } from "@angular/core";
import { catchError, switchMap, map } from "rxjs";
import { of } from 'rxjs'
import { createEffect, Actions, ofType } from "@ngrx/effects";

import { FeedService } from "../../services/feed.service";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "../actions/getFeed.action";
import { GetFeedResponseInterface } from "../../types/GetFeedResponse.interface";


@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({url}) => {
      return this.feedService.getFeed(url)
        .pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed })
          }),
          catchError(() => {
            return of(getFeedFailureAction())
          })
        )
    })
  ));


  constructor(
    private actions$: Actions,
    private feedService: FeedService,
  ) {}
}