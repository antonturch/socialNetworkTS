import {NavLink} from "react-router-dom";
import s from "./DialogsPage.module.css";
import React from "react";
import {DialogItemType, MessageItemType} from "../../redux/dialog-reducer";

export const DialogMessageItem: React.FC<DialogItemType> = (props) => {

    let path = "/dialogs/" + props.id
    return (
        <NavLink to={path} className={s.dialog}>{props.name}</NavLink>
    )
}

export const MessageItem: React.FC<MessageItemType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}