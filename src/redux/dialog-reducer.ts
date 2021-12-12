import {ActionsType} from "./profile-reducer";
import {FormSubmitDataType} from "../components/common/Form";

export type DialogItemType = {
    id: number
    name: string
}

export type MessageItemType = {
    id?: number
    message: string
}

export type DialogPageType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newMessageText: string
}

export type UpdateNewMessageTextType = { type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol: string }

export type AddNewMessageType = {
    type: "ADD-NEW-MESSAGE"
    newItemTextForm: FormSubmitDataType
}

const initialState: DialogPageType = {
    dialogsData: [
        {id: 1, name: "Anton"},
        {id: 2, name: "Дима"},
        {id: 3, name: "Витя"},
        {id: 4, name: "Костя"},
        {id: 5, name: "Виталя"},
    ],
    messagesData: [
        {id: 0, message: "Ку"},
        {id: 1, message: "Хай"},
        {id: 2, message: "Даров"},
        {id: 3, message: "Привет"},
        {id: 4, message: "Приветсткую Мусье"},
    ],
    newMessageText: "",
}

export const updateNewMessageTextAC = (newMessageSimbol: string): UpdateNewMessageTextType => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageSimbol}
}
export const addNewMessageAC = (newItemTextForm: FormSubmitDataType): AddNewMessageType => {
    return {type: "ADD-NEW-MESSAGE", newItemTextForm}
}

export const dialogReducer = (state = initialState, action: ActionsType): DialogPageType => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-TEXT":
            return {...state, newMessageText: action.newMessageSimbol}
        case "ADD-NEW-MESSAGE":
            if (action.newItemTextForm.newItemText === "") {
                alert("Please enter your message")
                return state
            } else {
                const stateCopy = {...state}
                const newMessageObj = {
                    id: state.messagesData.length,
                    message: action.newItemTextForm.newItemText
                }
                stateCopy.messagesData = [...state.messagesData, newMessageObj]
                return {...stateCopy}
            }

        default:
            return state
    }
}