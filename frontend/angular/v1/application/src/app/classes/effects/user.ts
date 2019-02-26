import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, BehaviorSubject } from 'rxjs';
// import { mergeMap } from 'rxjs/operators/mergeMap';
import { Storage } from '../storage';

import * as userActions from '../actions/user';
import { User } from '../user';
import { UserService } from 'src/app/services/user.service';
import { ApiResult } from '../api-result';

@Injectable()
export class UserEffects {

    // @Effect()
    // load_clients$ = this.actions
    //     .pipe(
    //         ofType(userActions.SignIn),
    //         mergeMap(() => this.user_service.clients()
    //             .pipe(
    //                 map(clients => { type: })
    //             )
    //         )
    //     );

    constructor(
        private actions: Actions,
        private storage: Storage,
        private user_service: UserService
    ) {}

    @Effect()
    init: Observable<Action> = defer(() => {
        let email = this.storage.native_session_storage.getItem('email');
        if (email == null) {
            email = '';
        }

        let permissions = this.storage.native_session_storage.getItem('permissions');
        if (permissions == null) {
            permissions = [];
        }
        // console.log(email);
        // console.log(permissions);

        // retrieve clients
        this.user_service.clients().subscribe((r: ApiResult) => {
            // console.log(r);
        });

        return new BehaviorSubject<Action>(new userActions.SignIn(new User(email, permissions)));
    });
}
