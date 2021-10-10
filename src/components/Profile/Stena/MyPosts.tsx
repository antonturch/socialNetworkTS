import React from "react";
import {Post} from "./Post";
import {MyPostsPropsType} from "../../../redux/state";
import {addNewPostTextAC, addPostAC} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {StateType} from "../../../redux/redux-store";

export const MyPosts: React.FC<MyPostsPropsType> = ({postsElements, addPost, addNewPostText, newPostText}) => {
    const postsElements1 = postsElements.map((el) => <Post postText={el.postText} likesCount={el.likesCount}/>)
    return (
        <div>
            <h3>my posts</h3>
            <textarea value={newPostText} placeholder={"Write to me smth"}
                      onChange={(e) => addNewPostText(e.currentTarget.value)}/>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            {postsElements1}
        </div>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        postsElements: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        addNewPostText: (newPostTest: string) => {
            dispatch(addNewPostTextAC(newPostTest))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);