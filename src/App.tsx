import React from "react";
import "./App.css";
import {Navbar} from "./components/Navbar/Navbar";
import {DialogsPageContainer} from "./components/DialogsPage/DialogsPage";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News";
import {Music} from "./components/Music";
import {Settings} from "./components/Settings";
import {UsersPageContainer} from "./components/UserPage/UsersPage";
import {ProfilePageContainer} from "./components/Profile/ProfileContainer";
import {HeaderConnect} from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/Login";


type AppPropsType = {}

const App: React.FC<AppPropsType> = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <HeaderConnect/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" render={() => <ProfilePageContainer />}/>
                    <Route path="/dialogs" render={() => <DialogsPageContainer />}/>
                    <Route path="/users" render={() => <UsersPageContainer />}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/login" component={LoginContainer}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
