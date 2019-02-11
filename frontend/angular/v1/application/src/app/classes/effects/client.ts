import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { defer, Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '../storage';

import * as clientActions from '../actions/client';

@Injectable()
export class ClientEffects {
    constructor(
        private actions: Actions,
        private storage: Storage
    ) {}

    @Effect()
    init: Observable<Action> = defer(() => {
        const client_id = this.storage.native_session_storage.getItem('client_id');
        return new BehaviorSubject<Action>(new clientActions.Select(client_id));
    });
}
