import { ClientActionTypes, ClientActionsUnion } from '../actions/client';

export interface State {
    client: string;
}

export const initialState: State = {
    client: '0'
};

export function reducer(state: State = initialState, action: ClientActionsUnion): State {
    switch (action.type) {
        case ClientActionTypes.SELECT: {
            return { ...state, client: action.payload };
        }
    }
}
