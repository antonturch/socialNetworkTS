import {Dispatch} from "redux";
import {getLoginThunk} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const INITIALIZED = "app/SET_INITIALIZED"

type initialStateType = {
    initialized: boolean
}

type ActionsType = ReturnType<typeof setInitializeStateAC>

const initialState: initialStateType = {
    initialized: false
}
export const setInitializeStateAC = () => ({
    type: INITIALIZED
})
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsType>

export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case INITIALIZED:
            return {...state, initialized: true}
        default:
            return state
    }
}

// export const initializeApp = () => {
//     return (dispatch: Dispatch) => {
//         // @ts-ignore
//         dispatch(getLoginThunk()).then(() => dispatch(setInitializeStateAC()))
//     }
// }
export const initializeApp = (): ThunkType => {
    return async (dispatch: Dispatch) => {
        // @ts-ignore
        dispatch(getLoginThunk()).then(() => dispatch(setInitializeStateAC()))
    }
}