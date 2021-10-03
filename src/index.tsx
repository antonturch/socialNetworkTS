import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from "./redux/state";


export const rerenderAllTree = () => {
    debugger
    ReactDOM.render(
        <React.StrictMode>
            <App postsData={store._state.profilePage.postsData} addPost={store.addPost}
                 dialogsData={store._state.dialogPage.dialogsData} messagesData={store._state.dialogPage.messagesData}
                 newPostText={store._state.profilePage.newPostText} addNewPostText={store.addNewPostText}/>
        </React.StrictMode>,
        document.getElementById("root")
    )
}

store.subscribe(rerenderAllTree)
rerenderAllTree()
