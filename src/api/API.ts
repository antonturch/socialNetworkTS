import axios from "axios";


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export type ResponseWithResultCodeType<D = {}> = {
    resultCode: ResultCodesEnum
    data: D
    messages: string[]
}


export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
    }
})


