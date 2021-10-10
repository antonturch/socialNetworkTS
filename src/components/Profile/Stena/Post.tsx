import React from "react";
import {PostType} from "../../../redux/profile-reducer";


export const Post: React.FC<PostType> = (props) => {
    return (
        <div>
            <div>{props.postText}   like {props.likesCount}</div>
        </div>
    )
}