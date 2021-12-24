import {Dispatch} from "redux";
import {ResultCodesEnum} from "../api/API";
import {stopSubmit} from "redux-form";
import {InferActionsType, ThunkType} from "./redux-store";
import {authApi} from "../api/auth-api";


export type AuthStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
    isFetching: boolean
}

const initState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
}

type ActionsType = InferActionsType<typeof actionsAuth>

export const actionsAuth = {
    setAuthUserData: (userId: string | null, email: string | null, login: string | null,
                      isAuth: boolean) => ({
        type: "auth/SET_USER_DATA",
        payload: {
            userId, email, login, isAuth
        },
    } as const),
}


export const authReducer = (state = initState, action: ActionsType) => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
            return {...state, ...action.payload, isAuth: action.payload.isAuth}
        default:
            return state
    }
}

export const getLoginThunk = (): ThunkType<ActionsType> => {
    return async (dispatch) => {
        const res = await authApi.getLogin()
        if (!initState.isAuth && res.resultCode === ResultCodesEnum.Success) {
//ERROR
//@ts-ignore
            dispatch(actionsAuth.setAuthUserData(res.data.id, res.data.email, res.data.login, true))
        }

    }
}

export const loginThunk = (email: string, password: string,
                           rememberMe: boolean): ThunkType<ActionsType | ReturnType<typeof stopSubmit>> => {
    return async (dispatch) => {
        const res = await authApi.login(email, password, rememberMe)
        if (res.resultCode === ResultCodesEnum.Success) {
            dispatch(getLoginThunk())
        } else {
            const errorMessage = res.messages[0]
            dispatch(stopSubmit("login", {_error: errorMessage}))
        }
    }
}

export const logOutThunks = (): ThunkType<ActionsType> => {
    return async (dispatch: Dispatch) => {
        const res = await authApi.logOut()
        if (res.data.resultCode === 0) {
            dispatch(actionsAuth.setAuthUserData(null, null, null, false))
        }
    }
}