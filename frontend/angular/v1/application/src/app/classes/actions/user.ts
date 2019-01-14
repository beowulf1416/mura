import { Action } from '@ngrx/store';

import { User } from '../user';

export enum UserActionTypes {
    SIGN_IN = 'user.sign_in',
    SIGN_OUT = 'user.sign_out'
}

export class SignIn implements Action {
    readonly type = UserActionTypes.SIGN_IN;

    constructor(
        public payload: User
    ) {}
}

export class SignOut implements Action {
    readonly type = UserActionTypes.SIGN_OUT;
}

export type UserActionsUnion = SignIn | SignOut;
