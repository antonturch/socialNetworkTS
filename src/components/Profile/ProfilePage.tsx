import React from "react";
import s from "./ProfilePage.module.css"
import {MyPosts} from "./Stena/MyPosts";
import {ProfileInfo} from "./ProfileInfo";
import {ProfilePagePropsType, ProfilePageType} from "../../redux/state";

export const ProfilePage: React.FC<ProfilePagePropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts postsData={props.postsData} addPost={props.addPost} newPostText={props.newPostText} addNewPostText={props.addNewPostText}/>
        </div>
    )
};