import React from "react";
import {Post} from "./Post";
import {actionsProfile, MyPostsPropsType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {StateType} from "../../../redux/redux-store";
import {AddItemForm, FormSubmitDataType} from "../../common/Form";


export const MyPosts: React.FC<MyPostsPropsType> = ({
                                                        postsElements,
                                                        addPost,
                                                        addNewPostText,
                                                        newPostText
                                                    }) => {
    const postsElements1 = postsElements.map(
        (el) => <Post postText={el.postText} likesCount={el.likesCount}/>)

    const onSubmitHandler = (newItemTextForm: FormSubmitDataType) => addPost(newItemTextForm)

    return (
        <div>
            <h3>my posts</h3>
            <AddItemForm onSubmit={onSubmitHandler}
                         name={"newItemText"} placeholder={"Tell what's happened"}/>
            {/*<textarea value={newPostText} placeholder={"Write to me smth"}*/}
            {/*          onChange={(e) => addNewPostText(e.currentTarget.value)}/>*/}
            {/*<div>*/}
            {/*    <button onClick={addPost}>Add post</button>*/}
            {/*</div>*/}
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
        addPost: (newItemTextForm: FormSubmitDataType) => {
            dispatch(actionsProfile.addPostAC(newItemTextForm))
        },
        addNewPostText: (newPostTest: string) => {
            dispatch(actionsProfile.addNewPostTextAC(newPostTest))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);