import {UserType} from "../redux/users-reducer";
import {instance, ResponseWithResultCodeType} from "./API";

export type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const usersApi = {

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