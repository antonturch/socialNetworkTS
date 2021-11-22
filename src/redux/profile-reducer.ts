import {AddNewMessageType, UpdateNewMessageTextType} from "./dialog-reducer";
const ADD_NEW_POST_TEXT = "ADD-NEW-POST-TEXT" as const
const SET_USER_PROFILE = "SET_USER_PROFILE" as const

export type PostType = {
    id?: number
    postText: string
    likesCount: number
}

export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
    profile: null | any
}

const initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "My 1st post", likesCount: 12},
        {id: 2, postText: "My 1st post", likesCount: 16},
    ],
    newPostText: "",
    profile: null
}

export type AddPostActionType = {
    type: "ADD-POST"
}

export type AddNewPostTextActionType = {
    type: "ADD-NEW-POST-TEXT"
    newPostText: string
}

export type SetUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: any
}

export type ActionsType =
    AddPostActionType
    | AddNewPostTextActionType
    | UpdateNewMessageTextType
    | AddNewMessageType
    | SetUserProfileActionType


export const addPostAC = (): AddPostActionType => {
    return {type: "ADD-POST"}
}
export const addNewPostTextAC = (newPostText: string): AddNewPostTextActionType => {
    return {type: "ADD-NEW-POST-TEXT", newPostText}
}

export const setUserProfileAC = (profile: any): SetUserProfileActionType => {
    return {type: SET_USER_PROFILE, profile}
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {

    switch (action.type) {
        case "ADD-POST":
            return {
                ...state,
                postsData: [...state.postsData, {id: 1, postText: state.newPostText, likesCount: 0}],
                newPostText: ""
            };
        case ADD_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
    }
}