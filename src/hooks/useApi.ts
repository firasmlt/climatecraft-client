import { useState } from "react"

// Define the types for the hook
type ApiFunc<T, P> = (...args: P[]) => Promise<{ data: T }>
interface ApiHook<T> {
    data: T | null
    error: any
    loading: boolean
    request: (...args: any[]) => void
}

export default function useApi<T, P>(apiFunc: ApiFunc<T, P>): ApiHook<T> {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const request = async (...args: P[]) => {
        setLoading(true)
        try {
            const result = await apiFunc(...args)
            setData(result.data)
        } catch (err) {
            setError(err || "Unexpected Error!")
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        error,
        loading,
        request,
    }
}
