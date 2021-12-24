import {Dispatch} from "redux";
import {getLoginThunk} from "./auth-reducer";
import {InferActionsType, ThunkType} from "./redux-store";

type initialStateType = {
    initialized: boolean
}

type ActionsType = InferActionsType<typeof actionsApp>

const initialState: initialStateType = {
    initialized: false
}
export const actionsApp = {
    setInitializeStateAC: () => ({
        type: "app/SET_INITIALIZED"
    } as const)
}

export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "app/SET_INITIALIZED":
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initializeApp = (): ThunkType<ActionsType> => {
    return async (dispatch: Dispatch) => {
        // @ts-ignore
        dispatch(getLoginThunk()).then(() => dispatch(actionsApp.setInitializeStateAC()))
    }
}