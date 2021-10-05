import {PostType} from "../components/Profile/Stena/Post";
import {ActionsType, AddNewPostTextActionType, AddPostActionType, ProfilePageType} from "./state";

const initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "My 1st post", likesCount: 12},
        {id: 2, postText: "My 1st post", likesCount: 16},
    ],
    newPostText: "",
}

export const addPostAC = (): AddPostActionType => {
    return {type: "ADD-POST"}
}
export const addNewPostTextAC = (newPostText: string): AddNewPostTextActionType => {
    return {type: "ADD-NEW-POST-TEXT", newPostText}
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {
        switch (action.type) {
            case "ADD-POST":
                const newPost: PostType = {id: 1, postText: state.newPostText, likesCount: 0}
                state.postsData.push(newPost)
                state.newPostText = ""
                return state;
            case "ADD-NEW-POST-TEXT":
                state.newPostText = action.newPostText;
                return state;
            default:
                return state;
        }
}