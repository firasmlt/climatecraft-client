import { AxiosResponse } from "axios"
import { apiClient } from "./client"
import APIResponse from "../types/response"
import { IUser } from "../types/user"

// const getAllAPIKeys = () => client.get('/apikey')

const getAuthenticatedUserInfoApi = (
    token: string
): Promise<AxiosResponse<APIResponse<IUser>>> =>
    apiClient.get(`/v1/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

const confirmEmailApi = (
    emailToken: string
): Promise<AxiosResponse<APIResponse<null>>> =>
    apiClient.get(`/v1/auth/confirm/${emailToken}`)

const verifyTokenApi = (
    token: string
): Promise<AxiosResponse<APIResponse<null>>> =>
    apiClient.post(`/v1/auth/verifyToken`, {
        resetToken: token,
    })

// const deleteAPI = (id) => client.delete(`/apikey/${id}`)

export default {
    getAuthenticatedUserInfoApi,
    confirmEmailApi,
}
