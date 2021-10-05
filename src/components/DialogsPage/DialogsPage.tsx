import React from "react";
import s from "./DialogsPage.module.css"
import {DialogMessageItem, MessageItem} from "./DialogMessageItem";
import {DialogPagePropsType} from "../../redux/state";
import {Button, TextField} from "@material-ui/core";



export const DialogsPage: React.FC<DialogPagePropsType> = (props) => {


    const dialogElements = props.dialogsData.map((el) => <DialogMessageItem id={el.id} name={el.name}/>);

    const messageElements = props.messagesData.map((el) => <MessageItem message={el.message}/>);

    return (
        <div className={s.dialogPage}>
            <div className={s.dialogs}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
            <TextField onChange={(e) => props.dispatch(props.updateNewMessageTextAC(e.currentTarget.value))} value={props.newMessageText} id="filled-basic" label="Ввидете сообщение" variant="filled"/>
            <Button onClick={() => props.dispatch(props.addNewMessageAC())} variant="outlined">Outlined</Button>
        </div>
    )
}