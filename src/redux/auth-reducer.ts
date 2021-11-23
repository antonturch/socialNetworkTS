const SET_USER_DATA = "SET_USER_DATA" as const

type setUserDataAСType = {
    type: "SET_USER_DATA"
    data: any
}

export type AuthStateType = {
    userId: string
    email: string
    login: string
    isAuth: boolean
    isFetching: boolean
}

const initState: AuthStateType = {
    userId: "",
    email: "",
    login: "",
    isAuth: true,
    isFetching: true,
}

type AuthActionsType = any

export const setUserDataAC = (userId: string, email: string, login: string): setUserDataAСType => ({
    type: SET_USER_DATA, data: {
        userId, email, login
    }
})

export const authReducer = (state = initState, action: AuthActionsType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}