import {AddNewMessageType, UpdateNewMessageTextType} from "./dialog-reducer";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = "ADD_POST" as const
const ADD_NEW_POST_TEXT = "ADD_NEW_POST_TEXT" as const
const SET_USER_PROFILE = "SET_USER_PROFILE" as const
const SET_USER_STATUS = "SET_USER_STATUS" as const


export type PostType = {
    id?: number
    postText: string
    likesCount: number
}

export type ProfileApiType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
    profile: ProfileApiType | null
    status: string | null
}

const initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "My 1st post", likesCount: 12},
        {id: 2, postText: "My 1st post", likesCount: 16},
    ],
    newPostText: "",
    profile: null,
    status: null,
}

export type AddPostActionType = {
    type: "ADD_POST"
}

export type AddNewPostTextActionType = {
    type: "ADD_NEW_POST_TEXT"
    newPostText: string
}

export type SetUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: any
}

type SetUserStatusACType = {
    type: "SET_USER_STATUS"
    status: string | null
}

export type ActionsType =
    AddPostActionType
    | AddNewPostTextActionType
    | UpdateNewMessageTextType
    | AddNewMessageType
    | SetUserProfileActionType
    | SetUserStatusACType


export const addPostAC = (): AddPostActionType => {
    return {type: ADD_POST}
}
export const addNewPostTextAC = (newPostText: string): AddNewPostTextActionType => {
    return {type: ADD_NEW_POST_TEXT, newPostText}
}

export const setUserProfileAC = (profile: ProfileApiType): SetUserProfileActionType => {
    return {type: SET_USER_PROFILE, profile}
}
export const setUserStatusAC = (status: string | null): SetUserStatusACType => {
    return {type: SET_USER_STATUS, status}
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, {id: 1, postText: state.newPostText, likesCount: 0}],
                newPostText: ""
            };
        case ADD_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_USER_STATUS:
            return {...state, status: action.status}
        default:
            return state;
    }
}

export const getProfileThunk = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfile(userId)
            .then(res => {
                dispatch(setUserProfileAC(res.data))
            })
    }
}

export const getUserStatusThunk = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId)
            .then(res => dispatch(setUserStatusAC(res.data)))
    }
}

export const updateUserStatusThunk = (newStatus: string) => {
  return (dispatch: Dispatch) => {
      profileAPI.updateStatus(newStatus)
          .then(res => {
              //@ts-ignore
              if (res.data.resultCode === 0) {
                  dispatch(setUserStatusAC(newStatus))
              }
          })
  }
}