import React from "react";
import s from "./ProfilePage.module.css"
import {ProfileApiType} from "../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: ProfileApiType | null
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile}) => {
    if (!profile) {
        return <></>
    }

    return (
        <div className={s.profileInfo}>
            <img src="https://www.tutu.ru/file/4/b379e7d5db28cd5708be3f1d45910fad/" alt=""/>
            <div>
                <img src={profile.photos.large} alt=""/>
                ava + discription
                <ProfileStatus/>
            </div>
        </div>
    )
}