import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA" as const

type setUserDataAСType = {
    type: "SET_USER_DATA"
    payload: any
}

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

type AuthActionsType = setUserDataAСType

export const setUserDataAC = (userId: string | null, email: string | null, login: string | null,
                              isAuth: boolean): setUserDataAСType => ({
    type: SET_USER_DATA,
    payload: {
        userId, email, login, isAuth
    },
})

export const authReducer = (state = initState, action: AuthActionsType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload, isAuth: action.payload.isAuth}
        default:
            return state
    }
}

export const getLoginThunk = () => {
    return (dispatch: Dispatch) => {
        authAPI.getLogin()
            .then(res => {
                // @ts-ignore
                if (!initState.isAuth && res.resultCode === 0) {
                    // @ts-ignore
                    dispatch(setUserDataAC(res.data.id, res.data.email, res.data.login, true))
                }
            })
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
                // @ts-ignore
                if (res.data.resultCode === 0) {
                    // @ts-ignore
                    dispatch(getLoginThunk())
                }
            })
    }
}

export const logOutThunks = () => {
    return (dispatch: Dispatch) => {
        authAPI.logOut()
            .then(res => {
                // @ts-ignore
                if (res.data.resultCode === 0) {
                    dispatch(setUserDataAC(null, null, null, false))
                }
            })
    }
}