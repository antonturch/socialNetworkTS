import React from "react";
import s from "./DialogsPage.module.css"
import {DialogMessageItem, MessageItem} from "./DialogMessageItem";
import {DialogPagePropsType} from "../../redux/state";
import {Button, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {addNewMessageAC, updateNewMessageTextAC} from "../../redux/dialog-reducer";
import {StateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export const DialogsPage: React.FC<DialogPagePropsType> = ({
                                                               dialogsData,
                                                               messagesData,
                                                               newMessageText,
                                                               updateNewMessageText,
                                                               addNewMessage,
                                                           }) => {


    const dialogElements = dialogsData.map((el) => <DialogMessageItem id={el.id} name={el.name}/>);

    const messageElements = messagesData.map((el) => <MessageItem message={el.message}/>);

    return (
        <div className={s.dialogPage}>
            <div className={s.dialogs}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
            <TextField onChange={(e) => updateNewMessageText(e.currentTarget.value)}
                       value={newMessageText} id="filled-basic" label="Введите сообщение"
                       variant="filled"/>
            <Button onClick={() => addNewMessage()} variant="outlined">Outlined</Button>
        </div>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
        dialogsData: state.dialogPage.dialogsData,
        messagesData: state.dialogPage.messagesData,
        newMessageText: state.dialogPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageText: (newMessageText: string) => {
            dispatch(updateNewMessageTextAC(newMessageText))
        },
        addNewMessage: () => {
            dispatch(addNewMessageAC())
        }
    }
}

export const DialogsPageContainer = connect(mapStateToProps, mapDispatchToProps)(
    withAuthRedirect(DialogsPage))