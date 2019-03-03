import { ClientActionTypes, ClientActionsUnion } from '../actions/client';

export interface State {
    client: {
        id: string,
        name: string
    };
}

export const initialState: State = {
    client: {
        id: '',
        name: 'None'
    }
};

export function reducer(state: State = initialState, action: ClientActionsUnion): State {
    switch (action.type) {
        case ClientActionTypes.SELECT: {
            if (action.payload != null) {
                const client = action.payload;
                return { ...state, client: client };
            } else {
                return state;
            }
        }
        default: {
            return state;
        }
    }
}
