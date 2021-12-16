import {FormSubmitDataType} from "../components/common/Form";

const UPDATE_NEW_MESSAGE_TEXT = "dialog/UPDATE_NEW_MESSAGE_TEXT"
const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE"

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

export type DialogPagePropsType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newMessageText: string
    updateNewMessageText: (newMessageText: string) => void
    addNewMessage: (newItemTextForm: FormSubmitDataType) => void
    isAuth: boolean
}


export type AddNewMessageType = {
    type: typeof ADD_NEW_MESSAGE
    newItemTextForm: FormSubmitDataType
}
export type UpdateNewMessageTextType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessageSimbol: string
}

type ActionsType = AddNewMessageType | UpdateNewMessageTextType

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
    return {type: UPDATE_NEW_MESSAGE_TEXT, newMessageSimbol}
}
export const addNewMessageAC = (newItemTextForm: FormSubmitDataType): AddNewMessageType => {
    return {type: ADD_NEW_MESSAGE, newItemTextForm}
}

export const dialogReducer = (state = initialState, action: ActionsType): DialogPageType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessageSimbol}
        case ADD_NEW_MESSAGE:
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