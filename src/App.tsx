import React from "react";
import "./App.css";
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {ProfilePage} from "./components/Profile/ProfilePage";
import {DialogsPage} from "./components/DialogsPage/DialogsPage";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News";
import {Music} from "./components/Music";
import {Settings} from "./components/Settings";

import {PostType} from "./components/Profile/Stena/Post";
import {DialogItemType, MessageItemType} from "./components/DialogsPage/DialogMessageItem";
import {
    ActionsType,
    AddNewMessageType,
    AddNewPostTextActionType,
    AddPostActionType,
    UpdateNewMessageTextType
} from "./redux/state";

type AppPropsType = {
    postsData: Array<PostType>
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItemType>
    newPostText: string
    addPostAC: () => AddPostActionType
    addNewPostTextAC: (newPostText: string) => AddNewPostTextActionType
    dispatch: (action: ActionsType) => void
    newMessageText: string
    updateNewMessageTextAC: (newMessageSimbol: string) => UpdateNewMessageTextType
    addNewMessageAC: () => AddNewMessageType
}

const App = (props: AppPropsType) => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <ProfilePage postsData={props.postsData}
                                                                      newPostText={props.newPostText}
                                                                      dispatch={props.dispatch}
                                                                      addPostAC={props.addPostAC}
                                                                      addNewPostTextAC={props.addNewPostTextAC}
                    />}/>
                    <Route path="/dialogs" render={() => <DialogsPage dialogsData={props.dialogsData}
                                                                      messagesData={props.messagesData}
                                                                      newMessageText={props.newMessageText}
                                                                      dispatch={props.dispatch}
                                                                      updateNewMessageTextAC={props.updateNewMessageTextAC}
                                                                      addNewMessageAC={props.addNewMessageAC}
                    />}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
