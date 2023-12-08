import axios from "axios"
import { UserCredentials, UserData } from "../../types/auth"

const register = async (userData: UserData) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        userData
    )
    if (response.data) {
        localStorage.setItem("token", response.data.data.token)
    }

    return response.data
}

const login = async (userCredentials: UserCredentials) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        userCredentials
    )

    if (response.data) {
        localStorage.setItem("token", response.data.data.token)
    }
    return response.data
}

const googleAuth = async (accessToken: string) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/google-auth`,
        {
            access_token: accessToken,
        }
    )
    if (response.data) {
        localStorage.setItem("token", response.data.data.token)
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem("token")
}

const authService = {
    register,
    login,
    googleAuth,
    logout,
}

export default authService
