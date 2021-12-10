import React from "react";
import s from "./ProfilePage.module.css"
import {ProfileInfo} from "./ProfileInfo";
import {MyPostsContainer} from "./Stena/MyPosts";
import {ProfileApiType} from "../../redux/profile-reducer";

type ProfilePagePropsType = {
    profile: ProfileApiType | null
    status: string | null
    updateStatusThunk: (newStatus: string) => void
}

export const ProfilePage: React.FC<ProfilePagePropsType> = ({profile, status,updateStatusThunk}) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={profile} status={status} updateStatusThunk={updateStatusThunk}/>
            <MyPostsContainer/>
        </div>
    )
};