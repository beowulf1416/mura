import { UserActionTypes, UserActionsUnion } from '../actions/user';
import { User } from '../user';

export interface State {
    user: User;
}

export const initialState: State = {
    user: new User('', Array<string>())
};

export function reducer(state: State = initialState, action: UserActionsUnion): State {
    switch (action.type) {
        case UserActionTypes.SIGN_IN: {
            return { ...state, user: action.payload };
        }
        case UserActionTypes.SIGN_OUT: {
            return { ...state, user: initialState.user };
        }
        case UserActionTypes.PERMISSION_UPDATE: {
            const user = state.user;
            user.permissions = action.payload;
            return { ...state, user: user};
        }
        default: {
            return state;
        }
    }
}
