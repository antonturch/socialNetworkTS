import React from "react";
import s from "./ProfilePage.module.css"

export const ProfileInfo: React.FC = () => {
    return (
        <div className={s.profileInfo}>
            <img src="https://www.tutu.ru/file/4/b379e7d5db28cd5708be3f1d45910fad/" alt=""/>
            <div> ava + discription<img src="" alt=""/></div>
        </div>
    )
}