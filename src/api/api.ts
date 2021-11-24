import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
    }
})

export const API = {
    getUsers(currentpage: number = 1, pageSize: number = 5) {
        return instance.get<any>(
            `users?page=${currentpage}&count=${pageSize}`).then(res => res.data)
    },
    getLogin() {
        return instance.get("auth/me")
    },
    follow(userId: number) {
        return instance.post(
            `follow/${userId}`,
            {}
        ).then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data)
    },
}