import {PostType} from "../components/Profile/Stena/Post";
import {DialogItemType, MessageItemType} from "../components/DialogsPage/DialogMessageItem";
import {rerenderAllTree} from "../components/render";



export type ProfilePageType = {
    postsData: Array<PostType>
    addPost: () => void
    newPostText: string
    addNewPostText: (newPostText: string) => void
}

export type DialogPageType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
}

export type StateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
}

const state: StateType = {
    profilePage: {
        postsData: [
            {id: 1, postText: "My 1st post", likesCount: 12},
            {id: 1, postText: "My 1st post", likesCount: 16},
        ],
        newPostText: "",
        addPost: function () {
            debugger
            const newPost: PostType = {id: 1, postText: state.profilePage.newPostText, likesCount: 0}
            state.profilePage.postsData.push(newPost)
            state.profilePage.addNewPostText("")
        },
        addNewPostText: function (newPostText: string) { debugger; state.profilePage.newPostText = newPostText; rerenderAllTree(state)},
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
}

export default state;