import {API} from "../api/api";
import {InferActionsType, StateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";


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
    followingInProgress: number[]
}

export type LocationType = {
    country: string
    city: string
}

const initState: UsersInitStateType = {
    users: [],
    pageSize: 8,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [],
}


type ActionsType = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsType>

export const actions = {
    setFollowingInProgressAC: (userId: number,
                               isLoading: boolean) => ({
        type: "SET_FOLLOWING_IN_PROGRESS",
        userId,
        isLoading,
    } as const),
    setFollowAC: (userId: number, isFollow: boolean) => ({
        type: "SET_FOLLOW",
        userId,
        isFollow
    } as const),
    setUsersAC: (users: UserType[], totalUsersCount: number) => ({
        type: "SET_USERS",
        users,
        totalUsersCount
    } as const),
    setCurrentPageAC: (currentPage: number) => ({
        type: "SET_CURRENT_PAGE",
        currentPage
    } as const),
    setLoadingAC: (isLoading: boolean) => ({type: "SET_LOADING", isLoading} as const),
}

export const usersReducer = (state = initState,
                             action: ActionsType) => {
    switch (action.type) {
        case "SET_FOLLOW":
            return {
                ...state, users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: !action.isFollow}
                    }
                    return el
                })
            }
        case "SET_USERS":
            return {...state, users: action.users, totalUsersCount: action.totalUsersCount}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_LOADING":
            return {...state, isLoading: action.isLoading}
        case "SET_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isLoading ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(el => el !== action.userId)
            }
        default:
            return state
    }
}

export const getUsersThunk = (currentPage: number,
                              pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setLoadingAC(true))
        const data = await API.getUsers(currentPage, pageSize)
        dispatch(actions.setUsersAC(data.items, data.totalCount))
        dispatch(actions.setLoadingAC(false))
    }
}

export const followThunk = (userId: number, isFollow: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFollowingInProgressAC(userId, true))
        const apiMethod = isFollow ? API.unFollow : API.follow
        const res = await apiMethod(userId)
        // @ts-ignore
        if (res.resultCode === 0) {
            dispatch(actions.setFollowAC(userId, isFollow))
            dispatch(actions.setFollowingInProgressAC(userId, false))
        }
    }
}

