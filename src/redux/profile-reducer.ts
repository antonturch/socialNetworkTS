import {AddNewMessageType, UpdateNewMessageTextType} from "./dialog-reducer";

export type PostType = {
    id?: number
    postText: string
    likesCount: number
}

export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
}

const initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "My 1st post", likesCount: 12},
        {id: 2, postText: "My 1st post", likesCount: 16},
    ],
    newPostText: "",
}

export type AddPostActionType = {
    type: "ADD-POST"
}

export type AddNewPostTextActionType = {
    type: "ADD-NEW-POST-TEXT"
    newPostText: string
}

export type ActionsType = AddPostActionType | AddNewPostTextActionType | UpdateNewMessageTextType | AddNewMessageType


export const addPostAC = (): AddPostActionType => {
    return {type: "ADD-POST"}
}
export const addNewPostTextAC = (newPostText: string): AddNewPostTextActionType => {
    return {type: "ADD-NEW-POST-TEXT", newPostText}
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            return {
                ...state,
                postsData: [...state.postsData, {id: 1, postText: state.newPostText, likesCount: 0}],
                newPostText: ""
            };
        case "ADD-NEW-POST-TEXT":
            return {...state, newPostText: action.newPostText};
        default:
            return state;
    }
}