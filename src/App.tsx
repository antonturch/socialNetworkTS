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
import {connect} from "react-redux";
import {StateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import img from "./components/common/Img/Preloader.gif"

// @ts-ignore
// const DialogsPageContainer = React.lazy(() => import("./components/DialogsPage/DialogsPage"))

type AppPropsType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        return (
            <>
                {this.props.initialized ? <BrowserRouter>
                    <div className="App">
                        <HeaderConnect/>
                        <Navbar/>
                        <div className="app-wrapper-content">
                            <Route path="/profile/:userId?" render={() => <ProfilePageContainer/>}/>
                            <Route path="/dialogs" render={() => <DialogsPageContainer/>}/>
                            <Route path="/users" render={() => <UsersPageContainer/>}/>
                            <Route path="/news" component={News}/>
                            <Route path="/music" component={Music}/>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/login" component={LoginContainer}/>
                        </div>
                    </div>
                </BrowserRouter> : <img src={img} alt="wait, loading"/>
                }
            </>
        );
    }
}

const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
})


export const AppContainer = connect(mapStateToProps, {initializeApp})(App)

