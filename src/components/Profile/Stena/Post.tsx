import React from "react";

export type PostType = {
    id?: number
    postText: string
    likesCount: number
}
export const Post: React.FC<PostType> = (props) => {
    return (
        <div>
            <div>{props.postText}   like {props.likesCount}</div>
        </div>
    )
}