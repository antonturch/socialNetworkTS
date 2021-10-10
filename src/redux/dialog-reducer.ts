import {ActionsType} from "./profile-reducer";

export type DialogItemType = {
    id: number
    name: string
}

export type MessageItemType = {
    id?:number
    message: string
}

export type DialogPageType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newMessageText: string
}

export type UpdateNewMessageTextType = { type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol: string }

export type AddNewMessageType = { type: "ADD-NEW-MESSAGE" }

const initialState: DialogPageType = {
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

export const updateNewMessageTextAC = (newMessageSimbol: string): UpdateNewMessageTextType => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol}
}
export const addNewMessageAC = (): AddNewMessageType => {
    return {type: "ADD-NEW-MESSAGE"}
}

export const dialogReducer = (state = initialState, action: ActionsType): DialogPageType => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-TEXT":
            return {...state, newMessageText: action.newMessageSimbol}
        case "ADD-NEW-MESSAGE":
            if (state.newMessageText.trim() !== "") {
                const newMessageObj = {id: 6, message: state.newMessageText}
                state.messagesData.push(newMessageObj)
                state.newMessageText = ""
            } else {
                alert("title is required")
            }
            return {...state}
        default:
            return state
    }
}