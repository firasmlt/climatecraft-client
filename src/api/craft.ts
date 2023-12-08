import { AxiosResponse } from "axios"
import { apiClient } from "./client"
import APIResponse from "../types/response"
import { CraftType } from "../types/craft"

const getAllUserCrafts = (
    token: string
): Promise<AxiosResponse<APIResponse<CraftType[]>>> =>
    apiClient.get("/v1/craft", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

const getOneCraft = (
    token: string,
    craftId: string
): Promise<AxiosResponse<APIResponse<CraftType>>> =>
    apiClient.get(`/v1/craft/${craftId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

const createCraft = (
    token: string,
    craft: any
): Promise<AxiosResponse<APIResponse<CraftType>>> =>
    apiClient.post(`/v1/craft/`, craft, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

const updateCraft = (
    token: string,
    craft: any
): Promise<AxiosResponse<APIResponse<CraftType>>> =>
    apiClient.patch(`/v1/craft/${craft.id}`, craft, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

const deleteCraft = (
    token: string,
    craftId: string
): Promise<AxiosResponse<APIResponse<null>>> =>
    apiClient.delete(`/v1/craft/${craftId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

// const deleteCraft = (id: string) => apiClient.delete(`/apikey/${id}`)

export default {
    getAllUserCrafts,
    getOneCraft,
    updateCraft,
    createCraft,
    deleteCraft,
}
