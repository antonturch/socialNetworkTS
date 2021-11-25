import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {AuthStateType, getLoginThunk, setUserDataAC} from "../../redux/auth-reducer";
import {API} from "../../api/api";

type HeaderContainerPropsType = {
    auth: AuthStateType
    setUserData: (userId: string, email: string, login: string) => void
    getLoginThunk: () => void
}

export class HeaderContainer extends React.Component<HeaderContainerPropsType, RootReducerType> {

    componentDidMount() {
        debugger
        this.props.getLoginThunk()
    }

    render() {
        return <Header auth={this.props.auth}/>
    }
}

const mapStateToProps = (state: StateType) => ({
    auth: state.auth
})

const MapDispatchToProps = (dispath: Dispatch) => ({
        setUserData: (userId: string, email: string, login: string) => {
            dispath(setUserDataAC(userId, email, login))
        },
        getLoginThunk
    }
)
export const HeaderConnect = connect(mapStateToProps, MapDispatchToProps)(HeaderContainer)