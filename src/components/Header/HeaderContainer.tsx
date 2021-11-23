import React from "react";
import axios from "axios";
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {AuthStateType, setUserDataAC} from "../../redux/auth-reducer";

type HeaderContainerPropsType = {
    auth: AuthStateType
    setUserData: (userId: string, email: string, login: string) => void
}

export class HeaderContainer extends React.Component<HeaderContainerPropsType, RootReducerType> {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", {withCredentials: true})
            .then(res => {
                // @ts-ignore
                if (this.props.auth.isAuth) {
                    // @ts-ignore
                    this.props.setUserData(res.data.data.id, res.data.data.email, res.data.data.login)
                }
            })
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
        }
    }
)
export const HeaderConnect = connect(mapStateToProps, MapDispatchToProps)(HeaderContainer)