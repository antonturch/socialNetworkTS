import React from "react";
import "./App.css";
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {ProfilePage} from "./components/Profile/ProfilePage";
import {DialogsPageContainer} from "./components/DialogsPage/DialogsPage";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News";
import {Music} from "./components/Music";
import {Settings} from "./components/Settings";
import {UsersPageContainer} from "./components/UserPage/UsersPage";

type AppPropsType = {}

const App: React.FC<AppPropsType> = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <ProfilePage />}/>
                    <Route path="/dialogs" render={() => <DialogsPageContainer />}/>
                    <Route path="/users" render={() => <UsersPageContainer/>}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
