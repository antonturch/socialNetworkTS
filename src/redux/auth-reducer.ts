const SET_USER_DATA = "SET_USER_DATA" as const

type setUserDataAСType = {
    type: "SET_USER_DATA"
    data: any
}

export type AuthStateType = {
    userId: string
    email: string
    login: string
    isFetching: boolean
}

const initState: AuthStateType = {
    userId: "",
    email: "",
    login: "",
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
            debugger
            return {...state, ...action.data}
        default:
            return state
    }
}