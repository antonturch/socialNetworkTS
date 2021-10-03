import React from "react";
import s from "./DialogsPage.module.css"

import {DialogMessageItem, MessageItem} from "./DialogMessageItem";
import {DialogPageType} from "../../redux/state";


export const DialogsPage: React.FC<DialogPageType> = (props) => {


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
        </div>
    )
}