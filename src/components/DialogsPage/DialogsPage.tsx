import React, {ComponentType} from "react";
import s from "./DialogsPage.module.css"
import {DialogMessageItem, MessageItem} from "./DialogMessageItem";
import {connect} from "react-redux";
import {compose} from "redux";
import {actionsDialog, DialogPagePropsType} from "../../redux/dialog-reducer";
import {StateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AddItemForm, FormSubmitDataType} from "../common/Form";


export const DialogsPage: React.FC<DialogPagePropsType> = ({
                                                               dialogsData,
                                                               messagesData,
                                                               addNewMessage,
                                                           }) => {

    const dialogElements = dialogsData.map((el) => <DialogMessageItem id={el.id} name={el.name}/>);

    const messageElements = messagesData.map((el) => <MessageItem message={el.message}/>);
    const onSubmitHandler = (newItemTextForm: FormSubmitDataType) => addNewMessage(newItemTextForm)
    return (
        <div className={s.dialogPage}>
            <div className={s.dialogs}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
            <AddItemForm onSubmit={onSubmitHandler}
                         name={"newItemText"} placeholder={"Write smth to smbd"}/>
            {/*<TextField onChange={(e) => updateNewMessageText(e.currentTarget.value)}*/}
            {/*           value={newMessageText} id="filled-basic" label="Введите сообщение"*/}
            {/*           variant="filled"/>*/}
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


export const DialogsPageContainer = compose<ComponentType>(
    connect(mapStateToProps, {addNewMessage: actionsDialog.addNewMessageAC}),
    withAuthRedirect,
)(DialogsPage)