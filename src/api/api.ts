import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {ProfileApiType} from "../redux/profile-reducer";

type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

type ResponseWithResultCodeType<D = {}> = {
    data: D
    messages: string[]
    resultCode: ResultCodesEnum
}


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
    }
})

export const API = {

    getUsers(currentpage: number = 1, pageSize: number = 5) {
        return instance.get<GetUsersResponseType>(
            `users?page=${currentpage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<{}, ResponseWithResultCodeType>(
            `follow/${userId}`,
            {}
        ).then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete<ResponseWithResultCodeType>(`follow/${userId}`).then(res => res.data)
    },
}

export const authAPI = {
    getLogin() {
        return instance.get<ResponseWithResultCodeType<{
            id: number
            email: string
            login: string
        }>>("auth/me").then(res => res.data)
    },
    login(email: string, password: string, rememberMe = true) {
        return instance.post<{ email: string, password: string, rememberMe: boolean },
            ResponseWithResultCodeType<{ usedId: number }>>(`auth/login`,
            {email, password, rememberMe}).then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseWithResultCodeType>(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileApiType>(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(newStatus: string) {
        return instance.put<{ status: string }, ResponseWithResultCodeType>(`profile/status/`,
            {status: newStatus})
    },
}