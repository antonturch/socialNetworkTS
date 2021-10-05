import {PostType} from "../components/Profile/Stena/Post";
import {DialogItemType, MessageItemType} from "../components/DialogsPage/DialogMessageItem";
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialog-reducer";


export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
}

export type ProfilePagePropsType = {
    postsData: Array<PostType>
    newPostText: string
    dispatch: (action: ActionsType) => void
    addPostAC: () => AddPostActionType
    addNewPostTextAC: (newPostText: string) => AddNewPostTextActionType
}

export type DialogPageType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newMessageText: string
}

export type DialogPagePropsType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newMessageText: string
    dispatch: (action: ActionsType) => void
    updateNewMessageTextAC: (newMessageSimbol: string) => UpdateNewMessageTextType
    addNewMessageAC: () => AddNewMessageType
}

export type StoreType = {
    _state: StateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => StateType
    dispatch: (action: ActionsType) => void
    addPostAC: () => AddPostActionType
    addNewPostTextAC: (newPostText: string) => AddNewPostTextActionType
    updateNewMessageTextAC: (newMessageSimbol: string) => UpdateNewMessageTextType
    addNewMessageAC: () => AddNewMessageType
}

export type StateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
}

export type AddPostActionType = {
    type: "ADD-POST"
}

export type AddNewPostTextActionType = {
    type: "ADD-NEW-POST-TEXT"
    newPostText: string
}

export type UpdateNewMessageTextType = { type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol: string }

export type AddNewMessageType = { type: "ADD-NEW-MESSAGE" }

export type ActionsType = AddPostActionType | AddNewPostTextActionType | UpdateNewMessageTextType | AddNewMessageType
export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, postText: "My 1st post", likesCount: 12},
                {id: 2, postText: "My 1st post", likesCount: 16},
            ],
            newPostText: "",

        },
        dialogPage: {
            dialogsData: [
                {id: 1, name: "Anton"},
                {id: 2, name: "Дима"},
                {id: 3, name: "Витя"},
                {id: 4, name: "Костя"},
                {id: 5, name: "Виталя"},
            ],
            messagesData: [
                {id: 1, message: "Ку"},
                {id: 2, message: "Хай"},
                {id: 3, message: "Даров"},
                {id: 4, message: "Привет"},
                {id: 5, message: "Приветсткую Мусье"},
            ],
            newMessageText: "",
        }
    },
    _callSubscriber() {
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    addPostAC(): AddPostActionType {
        return {type: "ADD-POST"}
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action)
        this._callSubscriber()
    },
    addNewPostTextAC(newPostText: string): AddNewPostTextActionType {
        return {type: "ADD-NEW-POST-TEXT", newPostText}
    },
    updateNewMessageTextAC(newMessageSimbol: string): UpdateNewMessageTextType {
        return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol}
    },
    addNewMessageAC(): AddNewMessageType {
        return {type: "ADD-NEW-MESSAGE"}
    },
}