import {FormSubmitDataType} from "../components/common/Form";
import {InferActionsType, ThunkType} from "./redux-store";
import {profileAPI} from "../api/pofile-api";


export type PostType = {
    id?: number
    postText: string
    likesCount: number
}

export type ProfileApiType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }
}

export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
    profile: ProfileApiType | null
    status: string
}


const initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "My 1st post", likesCount: 12},
        {id: 2, postText: "My 1st post", likesCount: 16},
    ],
    newPostText: "",
    profile: null,
    status: "",
}

export type ActionsType = InferActionsType<typeof actionsProfile>

export const actionsProfile = {
    addPostAC: (newItemTextForm: FormSubmitDataType) =>
        ({type: "profile/ADD_POST", newItemTextForm} as const),
    addNewPostTextAC: (newPostText: string) =>
        ({type: "profile/ADD_NEW_POST_TEXT", newPostText} as const),
    setUserProfileAC: (profile: ProfileApiType) =>
        ({type: "profile/SET_USER_PROFILE", profile} as const),
    setUserStatusAC: (status: string) => ({type: "profile/SET_USER_STATUS", status} as const),
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {

    switch (action.type) {
        case "profile/ADD_POST":
            return {
                ...state,
                postsData: [...state.postsData,
                    {id: 1, postText: action.newItemTextForm.newItemText, likesCount: 0}],
                newPostText: ""
            };
        case "profile/ADD_NEW_POST_TEXT":
            return {...state, newPostText: action.newPostText};
        case "profile/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "profile/SET_USER_STATUS":
            return {...state, status: action.status}
        default:
            return state;
    }
}

export const getProfileThunk = (userId: string): ThunkType<ActionsType> => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId)
        dispatch(actionsProfile.setUserProfileAC(data))
    }
}

export const getUserStatusThunk = (userId: string): ThunkType<ActionsType> => {
    return async (dispatch) => {
        const data = await profileAPI.getStatus(userId)
        dispatch(actionsProfile.setUserStatusAC(data))
    }
}

export const updateUserStatusThunk = (newStatus: string): ThunkType<ActionsType> => {
    return async (dispatch) => {
        const data = await profileAPI.updateStatus(newStatus)
        if (data.resultCode === 0) {
            dispatch(actionsProfile.setUserStatusAC(newStatus))
        }
    }
}