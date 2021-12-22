import {profileAPI} from "../api/api";
import {FormSubmitDataType} from "../components/common/Form";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const ADD_POST = "profile/ADD_POST"
const ADD_NEW_POST_TEXT = "profile/ADD_NEW_POST_TEXT"
const SET_USER_PROFILE = "profile/SET_USER_PROFILE"
const SET_USER_STATUS = "profile/SET_USER_STATUS"


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
    status: string
}

export type MyPostsPropsType = {
    postsElements: Array<any>
    newPostText: string
    addPost: (newItemTextForm: FormSubmitDataType) => void
    addNewPostText: (newPostText: string) => void
}

const initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "My 1st post", likesCount: 12},
        {id: 2, postText: "My 1st post", likesCount: 16},
    ],
    newPostText: "",
    profile: null,
    status: "",
}


export type AddPostActionType = {
    type: typeof ADD_POST
    newItemTextForm: FormSubmitDataType
}

export type AddNewPostTextActionType = {
    type: typeof ADD_NEW_POST_TEXT
    newPostText: string
}

export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: any
}

type SetUserStatusACType = {
    type: typeof SET_USER_STATUS
    status: string
}

export type ActionsType =
    AddPostActionType
    | AddNewPostTextActionType
    | SetUserProfileActionType
    | SetUserStatusACType
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsType>


export const addPostAC = (newItemTextForm: FormSubmitDataType): AddPostActionType => {
    return {type: ADD_POST, newItemTextForm}
}
export const addNewPostTextAC = (newPostText: string): AddNewPostTextActionType => {
    return {type: ADD_NEW_POST_TEXT, newPostText}
}
export const setUserProfileAC = (profile: ProfileApiType): SetUserProfileActionType => {
    return {type: SET_USER_PROFILE, profile}
}
export const setUserStatusAC = (status: string): SetUserStatusACType => {
    return {type: SET_USER_STATUS, status}
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData,
                    {id: 1, postText: action.newItemTextForm.newItemText, likesCount: 0}],
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

export const getProfileThunk = (userId: string): ThunkType => {
    return async (dispatch) => {
        const res = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(res.data))
    }
}

export const getUserStatusThunk = (userId: string): ThunkType => {
    return async (dispatch) => {
        const res = profileAPI.getStatus(userId)
        //@ts-ignore
        dispatch(setUserStatusAC(res.data))
    }
}

export const updateUserStatusThunk = (newStatus: string): ThunkType => {
    return async (dispatch) => {
        const res = await profileAPI.updateStatus(newStatus)
        //@ts-ignore
        if (res.data.resultCode === 0) {
            dispatch(setUserStatusAC(newStatus))
        }
    }
}