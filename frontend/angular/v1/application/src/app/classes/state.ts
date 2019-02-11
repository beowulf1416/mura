import { ActionReducerMap } from '@ngrx/store';

import * as user from './reducers/user';
import * as client from './reducers/client';

export interface State {
    user: user.State;
    client: client.State;
}

export const reducers: ActionReducerMap<State> = {
    user: user.reducer,
    client: client.reducer
};
