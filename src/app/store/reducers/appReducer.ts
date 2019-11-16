import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/appActions';

export interface appReducerState {
    login: boolean
}

const initialState: appReducerState = {
    login: false,
    //. ..
}

export function reducer(state = initialState, action): appReducerState {
    switch(action.type) {
        case ACTION_LOGOUT:
            return {
                ...state,
                login: false
            }
        case ACTION_LOGIN:
            return {
                ...state,
                login: true
            }
    }

    return state;
}