import React from "react";
import s from "./ProfilePage.module.css"
import {MyPosts} from "./Stena/MyPosts";
import {ProfileInfo} from "./ProfileInfo";
import {ProfilePagePropsType} from "../../redux/state";

export const ProfilePage: React.FC<ProfilePagePropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts postsData={props.postsData} dispatch={props.dispatch}
                     newPostText={props.newPostText}
                     addPostAC={props.addPostAC} addNewPostTextAC={props.addNewPostTextAC}
            />
        </div>
    )
};