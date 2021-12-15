import {Dispatch} from "redux";
import {getLoginThunk} from "./auth-reducer";

const INITIALIZED = "app/SET_INITIALIZED" as const

type initialStateType = {
    initialized: boolean
}

type ActionTypes = ReturnType<typeof setInitializeStateAC>

const initialState: initialStateType = {
    initialized: false
}
export const setInitializeStateAC = () => ({
    type: INITIALIZED
})

export const appReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case INITIALIZED:
            return {...state, initialized: true}
        default:
            return state
    }
}
export const initializeApp = () => {
    return (dispatch: Dispatch) => {
        // @ts-ignore
        dispatch(getLoginThunk()).then(() => dispatch(setInitializeStateAC()))
    }
}