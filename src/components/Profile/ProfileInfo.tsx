import React from "react";
import s from "./ProfilePage.module.css"
import {ProfilePageType} from "../../redux/profile-reducer";

type ProfileInfoPropsType = {
    profile: ProfilePageType
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile}) => {
    if (!profile) {
        return <></>
    }
    return (
        <div className={s.profileInfo}>
            <img src="https://www.tutu.ru/file/4/b379e7d5db28cd5708be3f1d45910fad/" alt=""/>
            <div>
                ava + discription
                <img src={profile.profile} alt=""/>
            </div>
        </div>
    )
}