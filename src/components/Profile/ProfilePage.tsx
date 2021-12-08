import React from "react";
import s from "./ProfilePage.module.css"
import {ProfileInfo} from "./ProfileInfo";
import {MyPostsContainer} from "./Stena/MyPosts";
import {ProfileApiType} from "../../redux/profile-reducer";
import {Redirect} from "react-router-dom";

type ProfilePagePropsType = {
    profile: ProfileApiType | null
}

export const ProfilePage: React.FC<ProfilePagePropsType> = ({profile}) => {
    if (this.props.isAuth === false) {
        return <Redirect to={"/login"}/>
    }
    return (
        <div className={s.content}>
            <ProfileInfo profile={profile} />
            <MyPostsContainer/>
        </div>
    )
};