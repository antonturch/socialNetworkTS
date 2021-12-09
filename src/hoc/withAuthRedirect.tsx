import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: StateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect <T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: mapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={"/login"}/>
        }
        return <Component {...restProps as T}/>;
    };

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
