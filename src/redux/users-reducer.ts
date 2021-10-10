export type UserType = {
    id: number
    isFollow: boolean
    name: string
    location: LocationType
    comment: string
}
export type UsersInitStateType = {
    users: UserType[]
}

export type LocationType = {
    country: string
    city: string
}

export type setFollowACType = {
    type: "SET-FOLLOW"
    userId: number
    isFollow: boolean
}

export type setUsersACType = {
    type: "SET-USERS"
    users: UserType[]
}

const initState: UsersInitStateType = {
    users: [
        {
            id: 0,
            isFollow: false,
            name: "Anton",
            location: {country: "Belarus", city: "Zhodino"},
            comment: "I am still study right now"
        },
        {
            id: 1,
            isFollow: false,
            name: "Anton",
            location: {country: "Belarus", city: "Zhodino"},
            comment: "I am still study right now"
        },
    ]
}

export const setFollowAC = (userId: number, isFollow: boolean): setFollowACType => {
    return {
        type: "SET-FOLLOW",
        userId,
        isFollow
    }
}

export const setUsersAC = (users: UserType[]): setUsersACType => ({type: "SET-USERS", users})

export const usersReducer = (state = initState, action: setFollowACType | setUsersACType) => {
    switch (action.type) {
        case "SET-FOLLOW":
            return {
                ...state, users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, isFollow: !action.isFollow}
                    }
                    return el
                })
            }
        case "SET-USERS":
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}