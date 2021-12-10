import {
    ActionsType,
    AddNewPostTextActionType,
    AddPostActionType,
    ProfilePageType,
    profileReducer
} from "./profile-reducer";
import {
    AddNewMessageType,
    DialogItemType,
    DialogPageType,
    dialogReducer,
    MessageItemType,
    UpdateNewMessageTextType
} from "./dialog-reducer";


export type MyPostsPropsType = {
    postsElements: Array<any>
    newPostText: string
    addPost: () => void
    addNewPostText: (newPostText: string) => void
}


export type DialogPagePropsType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newMessageText: string
    updateNewMessageText: (newMessageText: string) => void
    addNewMessage: () => void
    isAuth: boolean
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


export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, postText: "My 1st post", likesCount: 12},
                {id: 2, postText: "My 1st post", likesCount: 16},
            ],
            newPostText: "",
            profile: null,
            status: null,

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
        return {type: "ADD_POST"}
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action)
        this._callSubscriber()
    },
    addNewPostTextAC(newPostText: string): AddNewPostTextActionType {
        return {type: "ADD_NEW_POST_TEXT", newPostText}
    },
    updateNewMessageTextAC(newMessageSimbol: string): UpdateNewMessageTextType {
        return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol}
    },
    addNewMessageAC(): AddNewMessageType {
        return {type: "ADD-NEW-MESSAGE"}
    },
}