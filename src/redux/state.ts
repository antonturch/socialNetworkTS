import {PostType} from "../components/Profile/Stena/Post";
import {DialogItemType, MessageItemType} from "../components/DialogsPage/DialogMessageItem";


export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
}

export type ProfilePagePropsType = {
    postsData: Array<PostType>
    newPostText: string
    addNewPostText: (newPostText: string) => void
    addPost: () => void
}

export type DialogPageType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
}

export type StoreType = {
    _state: StateType
    subscribe: (observer: () => void) => void
    onChange: () => void
    addNewPostText: (newPostText: string) => void
    addPost: () => void
    getState: () => StateType
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
        }
    },
    subscribe(observer: () => void) {
        this.onChange = observer
    },
    onChange() {
    },
    addNewPostText(newPostText: string) {
        this._state.profilePage.newPostText = newPostText;
        this.onChange()
    },
    addPost() {
        debugger
        const newPost: PostType = {id: 1, postText: this._state.profilePage.newPostText, likesCount: 0}
        this._state.profilePage.postsData.push(newPost)
        this.addNewPostText("")
    },
    getState() {
        return this._state
    },
}

// const state: StateType = {
//     profilePage: {
//         postsData: [
//             {id: 1, postText: "My 1st post", likesCount: 12},
//             {id: 2, postText: "My 1st post", likesCount: 16},
//         ],
//         newPostText: "",
//         addPost: function () {
//             debugger
//             const newPost: PostType = {id: 1, postText: state.profilePage.newPostText, likesCount: 0}
//             state.profilePage.postsData.push(newPost)
//             state.profilePage.addNewPostText("")
//         },
//         addNewPostText: function (newPostText: string) { debugger; state.profilePage.newPostText = newPostText; onChange()},
//     },
//     dialogPage: {
//         dialogsData: [
//             {id: 1, name: "Anton"},
//             {id: 2, name: "Дима"},
//             {id: 3, name: "Витя"},
//             {id: 4, name: "Костя"},
//             {id: 5, name: "Виталя"},
//         ],
//         messagesData: [
//             {id: 1, message: "Ку"},
//             {id: 2, message: "Хай"},
//             {id: 3, message: "Даров"},
//             {id: 4, message: "Привет"},
//             {id: 5, message: "Приветсткую Мусье"},
//         ],
//     }
// }
