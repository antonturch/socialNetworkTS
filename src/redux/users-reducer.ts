export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    followed: boolean
}
export type UsersInitStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isLoading: boolean
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
    totalUsersCount: number
}

export type setCurrentPageACType = {
    type: "SET-CURRENT-PAGE"
    currentPage: number
}

export type setLoadingACType = {
    type: "SET-LOADING"
    isLoading: boolean
}

const initState: UsersInitStateType = {
    users: [],
    pageSize: 4,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: false
}

export const setFollowAC = (userId: number, isFollow: boolean): setFollowACType => {
    return {
        type: "SET-FOLLOW",
        userId,
        isFollow
    }
}

export const setUsersAC = (users: UserType[], totalUsersCount: number): setUsersACType => ({
    type: "SET-USERS",
    users,
    totalUsersCount
})

export const setCurrentPageAC = (currentPage: number): setCurrentPageACType => ({
    type: "SET-CURRENT-PAGE",
    currentPage
})

export const setLoadingAC = (isLoading: boolean): setLoadingACType => ({type: "SET-LOADING", isLoading})

export const usersReducer = (state = initState,
                             action: setFollowACType | setUsersACType | setCurrentPageACType | setLoadingACType) => {
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
            return {...state, users: action.users, totalUsersCount: action.totalUsersCount}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}