import {instance, ResponseWithResultCodeType} from "./API";
import {AxiosResponse} from "axios";

type LoginDataType = {
    id: number
    email: string
    login: string
}
export const authApi = {
    getLogin() {
        return instance.get<ResponseWithResultCodeType<LoginDataType>>("auth/me")
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe = true) {
        return instance.post<{ email: string, password: string, rememberMe: boolean },
            AxiosResponse<ResponseWithResultCodeType>>(`auth/login`,
            {email, password, rememberMe}).then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseWithResultCodeType>(`auth/login`)
    }
}