import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import state from "./redux/state";


import ReactDOM from "react-dom";
import App from "./App";
import {StateType} from "./redux/state";


export const rerenderAllTree = (state: StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App postsData={state.profilePage.postsData} addPost={state.profilePage.addPost}
                 dialogsData={state.dialogPage.dialogsData} messagesData={state.dialogPage.messagesData}
                 newPostText={state.profilePage.newPostText} addNewPostText={state.profilePage.addNewPostText}/>
        </React.StrictMode>,
        document.getElementById("root")
    )
}

rerenderAllTree(state);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
