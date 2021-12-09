import React from "react";
import s from "./ProfilePage.module.css"
import {ProfileInfo} from "./ProfileInfo";
import {MyPostsContainer} from "./Stena/MyPosts";
import {ProfileApiType} from "../../redux/profile-reducer";

type ProfilePagePropsType = {
    profile: ProfileApiType | null
}

export const ProfilePage: React.FC<ProfilePagePropsType> = ({profile}) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={profile} />
            <MyPostsContainer/>
        </div>
    )
};