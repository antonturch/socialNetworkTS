import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootReducerType, StateType} from "../../redux/redux-store";
import {AuthStateType, getLoginThunk} from "../../redux/auth-reducer";

type HeaderContainerPropsType = {
    auth: AuthStateType
    // setUserData: (userId: string, email: string, login: string) => void
    getLoginThunk: () => void
}

export class HeaderContainer extends React.Component<HeaderContainerPropsType, RootReducerType> {

    componentDidMount() {
        this.props.getLoginThunk()
        // authAPI.getLogin()
        //     .then(res => {
        //         // @ts-ignore
        //         this.props.setUserData(res.data.id, res.data.email, res.data.login)
        //     })
    }

    render() {
        return <Header auth={this.props.auth}/>
    }
}

const mapStateToProps = (state: StateType) => ({
    auth: state.auth
})

// const MapDispatchToProps = (dispath: Dispatch) => ({
//         setUserData: (userId: string, email: string, login: string) => {
//             dispath(setUserDataAC(userId, email, login))
//         },
//         getLoginThunk: getLoginThunk
//     }
// )
export const HeaderConnect = connect(mapStateToProps, {getLoginThunk})(HeaderContainer)