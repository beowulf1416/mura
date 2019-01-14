import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { defer, Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '../storage';

import * as userActions from '../actions/user';
import { User } from '../user';

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private storage: Storage
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

        return new BehaviorSubject<Action>(new userActions.SignIn(new User(email, permissions)));
    });
}
