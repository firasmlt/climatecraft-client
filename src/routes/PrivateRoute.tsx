import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import useAppSelector from "../hooks/useAppSelector"
import useApi from "../hooks/useApi"
import user from "../api/user"
import ProgressBar from "../ui-components/common/ProgressBar"
import LoadingSpinner from "../ui-components/common/LoadingSpinner"

interface PrivateRouteProps {
    element: any
}
const PrivateRoute = ({ element }: PrivateRouteProps) => {
    const token = useAppSelector((state) => state.auth.token)
    console.log(`${token}`)
    const getAuthenticatedUserInfoApi = useApi(user.getAuthenticatedUserInfoApi)

    useEffect(() => {
        getAuthenticatedUserInfoApi.request(token)
    }, [])

    return (
        <>
            {!getAuthenticatedUserInfoApi.data && (
                <div className="w-[100vw] h-[100vh] bg-white absolute top-0 left-0 z-50 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}
            {getAuthenticatedUserInfoApi.data && element}

            {getAuthenticatedUserInfoApi.error && <Navigate to={"/login"} />}
        </>
    )
}

export default PrivateRoute
