import { Action } from '@ngrx/store';

import { User } from '../user';

export enum UserActionTypes {
    SIGN_IN = 'user.sign_in',
    SIGN_OUT = 'user.sign_out',
    PERMISSION_UPDATE = 'user.permission_update'
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

export class PermissionUpdate implements Action {
    readonly type = UserActionTypes.PERMISSION_UPDATE;

    constructor (
        public payload: Array<string>
    ) {}
}

export type UserActionsUnion = SignIn | SignOut | PermissionUpdate;
