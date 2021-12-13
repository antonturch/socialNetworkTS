import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css"
import {AuthStateType} from "../../redux/auth-reducer";

type PropsType = {
    auth: AuthStateType
    logOutThunks: () => void
}

export const Header: React.FC<PropsType> = ({auth, logOutThunks}) => {
    return (
        <header className={s.header}>
            <img src="https://автолого.рф/wp-content/uploads/bmw-logo-2020-grey.png" alt=""/>
            <div className={s.loginBlock}>
                <div>Your nick now is {auth.login}</div>
                {auth.isAuth ? <button onClick={logOutThunks}>Log out</button>
                    : <NavLink to={"/login"}>Log in</NavLink>
                }
            </div>
        </header>
    )
}