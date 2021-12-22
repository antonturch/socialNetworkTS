import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const SET_USER_DATA = "auth/SET_USER_DATA"


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

type ActionsType = ReturnType<typeof setAuthUserData>
// type SetAuthUserDataPayloadType = {
//     userId: string
//     email: string
//     login: string
//     isAuth: boolean
// }

type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsType | ReturnType<typeof stopSubmit>>

export const setAuthUserData = (userId: string | null, email: string | null, login: string | null,
                                isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {
        userId, email, login, isAuth
    },
})

export const authReducer = (state = initState, action: ActionsType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload, isAuth: action.payload.isAuth}
        default:
            return state
    }
}

export const getLoginThunk = (): ThunkType => {
    return async (dispatch) => {
        const res = await authAPI.getLogin()
        //@ts-ignore
        if (!initState.isAuth && res.resultCode === 0) {
            //@ts-ignore
            dispatch(setAuthUserData(res.data.id, res.data.email, res.data.login, true))
        }

    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        const res = await authAPI.login(email, password, rememberMe)
        // @ts-ignore
        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(getLoginThunk())
        } else {
            // @ts-ignore
            const errorMessage = res.data.messages[0]
            dispatch(stopSubmit("login", {_error: errorMessage}))
        }
    }
}

export const logOutThunks = () => {
    return async (dispatch: Dispatch) => {
        const res = await authAPI.logOut()
        // @ts-ignore
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}