import {API} from "../api/api";
import {StateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_FOLLOWING_IN_PROGRESS = "users/SET_FOLLOWING_IN_PROGRESS"
const SET_FOLLOW = "users/SET_FOLLOW"
const SET_USERS = "users/SET_USERS"
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE"
const SET_LOADING = "users/SET_LOADING"

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

export type setFollowACType = {
    type: typeof SET_FOLLOW
    userId: number
    isFollow: boolean
}

export type setUsersACType = {
    type: typeof SET_USERS
    users: UserType[]
    totalUsersCount: number
}

export type setCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export type setLoadingACType = {
    type: typeof SET_LOADING
    isLoading: boolean
}

const initState: UsersInitStateType = {
    users: [],
    pageSize: 8,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [],
}

type setFollowingInProgressType = {
    type: typeof SET_FOLLOWING_IN_PROGRESS
    userId: number
    isLoading: boolean
}

type ActionsType =
    setFollowingInProgressType
    | setFollowACType
    | setUsersACType
    | setCurrentPageACType
    | setLoadingACType
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsType>

export const setFollowingInProgressAC = (userId: number,
                                         isLoading: boolean): setFollowingInProgressType => ({
    type: SET_FOLLOWING_IN_PROGRESS,
    userId,
    isLoading,
})

export const setFollowAC = (userId: number, isFollow: boolean): setFollowACType => ({
        type: SET_FOLLOW,
        userId,
        isFollow
    }
)

export const setUsersAC = (users: UserType[], totalUsersCount: number): setUsersACType => ({
    type: SET_USERS,
    users,
    totalUsersCount
})

export const setCurrentPageAC = (currentPage: number): setCurrentPageACType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const setLoadingAC = (isLoading: boolean): setLoadingACType => ({type: SET_LOADING, isLoading})

export const usersReducer = (state = initState,
                             action: ActionsType) => {
    switch (action.type) {
        case SET_FOLLOW:
            return {
                ...state, users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: !action.isFollow}
                    }
                    return el
                })
            }
        case SET_USERS:
            return {...state, users: action.users, totalUsersCount: action.totalUsersCount}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_LOADING:
            return {...state, isLoading: action.isLoading}
        case SET_FOLLOWING_IN_PROGRESS:
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
        dispatch(setLoadingAC(true))
        const data = await API.getUsers(currentPage, pageSize)
        dispatch(setUsersAC(data.items, data.totalCount))
        dispatch(setLoadingAC(false))
    }
}

export const followThunk = (userId: number, isFollow: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(setFollowingInProgressAC(userId, true))
        const apiMethod = isFollow ? API.unFollow : API.follow
        const res = await apiMethod(userId)
        // @ts-ignore
        if (res.resultCode === 0) {
            dispatch(setFollowAC(userId, isFollow))
            dispatch(setFollowingInProgressAC(userId, false))
        }
    }
}

