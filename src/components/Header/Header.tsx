import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css"
import {AuthStateType} from "../../redux/auth-reducer";

type PropsType = {
    auth: AuthStateType
}

export const Header: React.FC<PropsType> = ({auth}) => {
    return (
        <header className={s.header}>
            <img src="https://автолого.рф/wp-content/uploads/bmw-logo-2020-grey.png" alt=""/>
            <div className={s.loginBlock}>
                <div>Your nick now is {auth.login}</div>
                <NavLink to={"/login"}>Log in</NavLink>
            </div>
        </header>
    )
}