import React, {ChangeEvent, LegacyRef} from "react";
import {Post} from "./Post";
import {ProfilePageType} from "../../../redux/state";

export const MyPosts: React.FC<ProfilePageType> = (props) => {

    const postsElements = props.postsData.map((el) => <Post postText={el.postText} likesCount={el.likesCount}/>)

    const addNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger;
        props.addNewPostText(e.currentTarget.value)
    }
    const addPost = () => {
        debugger
        props.addPost()
    }

    return (
        <div>
            <h3>my posts</h3>
            <textarea value={props.newPostText} placeholder={"Write to me smth"} onChange={addNewPostText}/>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            {postsElements}
        </div>
    )
}