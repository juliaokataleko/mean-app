import { reducer, appReducerState } from './appReducer'
import { ActionReducerMap } from '@ngrx/store'

interface AppState {
    appReducer: appReducerState
}

export const reducers: ActionReducerMap<AppState> = {
    appReducer: reducer
}