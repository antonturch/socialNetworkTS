import React from "react";
import s from "./ProfilePage.module.css"
import {ProfileInfo} from "./ProfileInfo";
import {ProfilePagePropsType} from "../../redux/state";
import {MyPostsContainer} from "./Stena/MyPosts";

export const ProfilePage: React.FC<ProfilePagePropsType> = ({profile}) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    )
};