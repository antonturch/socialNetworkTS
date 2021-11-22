// @ts-ignore
const SET_USER_DATA = "SET_USER_DATA" as const

type setUserDataAСType = {
    type: "SET_USER_DATA"
    data: any
}

const initState = {
    userId: null,
    email: null,
    login: null,
    isFetching: true,
}

type AuthActionsType = any

const setUserDataAC = (userId: string, email: string, login: string) => ({
    type: SET_USER_DATA, data: {
        userId, email, login
    }
})

const authReducer = (state = initState, action: AuthActionsType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data}
        default:
            return state
    }
}