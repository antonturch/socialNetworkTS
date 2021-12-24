import {ProfileApiType} from "../redux/profile-reducer";
import {instance, ResponseWithResultCodeType} from "./API";
import {AxiosResponse} from "axios";

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileApiType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(newStatus: string) {
        return instance.put<{ status: string }, AxiosResponse<ResponseWithResultCodeType>>(`profile/status`,
            {status: newStatus}).then(res => res.data)
    },
}