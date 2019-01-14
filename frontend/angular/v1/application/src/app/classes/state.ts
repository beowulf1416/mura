import { ActionReducerMap } from '@ngrx/store';

import * as user from './reducers/user';

export interface State {
    user: user.State;
}

export const reducers: ActionReducerMap<State> = {
    user: user.reducer
};
