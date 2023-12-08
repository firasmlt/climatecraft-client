type APIResponse<T = any> = {
    data: T
    status: number
    message: string
}

export default APIResponse
