import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from "./redux/redux-store";
import {addNewPostTextAC, addPostAC} from "./redux/profile-reducer";
import {addNewMessageAC, updateNewMessageTextAC} from "./redux/dialog-reducer";


export const rerenderAllTree = () => {

    const state = store.getState();

    ReactDOM.render(
        <React.StrictMode>
            <App postsData={state.profileReducer.postsData}
                 dialogsData={state.dialogReducer.dialogsData} messagesData={state.dialogReducer.messagesData}
                 newPostText={state.profileReducer.newPostText}
                 addPostAC={addPostAC} addNewPostTextAC={addNewPostTextAC}
                 dispatch={store.dispatch}
                 newMessageText={state.dialogReducer.newMessageText}
                 updateNewMessageTextAC={updateNewMessageTextAC}
                 addNewMessageAC={addNewMessageAC}
            />
        </React.StrictMode>,
        document.getElementById("root")
    )
}

store.subscribe(rerenderAllTree)
rerenderAllTree()
