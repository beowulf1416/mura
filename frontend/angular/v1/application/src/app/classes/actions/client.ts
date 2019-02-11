import { Action } from '@ngrx/store';

export enum ClientActionTypes {
    SELECT = 'client.select'
}

export class Select implements Action {
    readonly type = ClientActionTypes.SELECT;

    constructor(
        public payload: string
    ) {}
}

export type ClientActionsUnion = Select;
