import { useEffect, useState } from "react"
import useAppSelector from "../../hooks/useAppSelector"
import {
    googleAuthenticateUser,
    loginUser,
    reset,
} from "../../features/auth/authSlice"
import { UserCredentials } from "../../types/auth"
import { Link, useNavigate } from "react-router-dom"
import InvalidInput from "../../ui-components/auth/InvalidInput"
import useThunkDispatch from "../../hooks/useThunkDispatch"
import ProgressBar from "../../ui-components/common/ProgressBar"
import { useGoogleLogin } from "@react-oauth/google"
import GoogleImage from "../../assets/images/google.png"
import logo from "../../assets/images/logo.png"

import AuthHeader from "./AuthHeader"

const LoginPage = () => {
    // state
    const [showInputIncorrect, setShowInputIncorrect] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [userCredentials, setUserCredentials] = useState<UserCredentials>({
        email: "",
        password: "",
    })

    const { isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.auth
    )

    // dispatch function
    const dispatch = useThunkDispatch()
    // router
    const navigate = useNavigate()
    // login handler
    const login = useGoogleLogin({
        onSuccess: (codeResponse) =>
            console.log(
                "successs: ",
                dispatch(googleAuthenticateUser(codeResponse.access_token))
            ),
        onError: (error) => console.log("Login Failed:", error),
    })

    // handlers

    const signInHandler = async (e: any) => {
        e.preventDefault()

        // input validation
        if (!userCredentials.email || !userCredentials.password) {
            return
        }
        if (
            !userCredentials.email.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            const errorMessage = "Invalid Email Address"
            setErrorMessage(errorMessage)
            setShowInputIncorrect(true)
            return
        }

        dispatch(loginUser(userCredentials))
    }

    useEffect(() => {
        if (isLoading) return

        if (isError) {
            setShowInputIncorrect(true)
            setErrorMessage("Invalid credentials")
        }
        if (isSuccess) {
            navigate("/timeline")
        }
    }, [isError, isLoading, isSuccess, message])

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <>
            <AuthHeader type="register" />
            <div className="flex min-h-full flex-col justify-center py-2 sm:px-6 lg:px-8">
                <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                    <div>
                        <h2 className="mt-4 text-3xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 mb-3 text-sm leading-6 text-gray-500 text-center">
                            Not a member?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-[#29ADB2] hover:text-[#59ADB2]"
                            >
                                Create your free account now.
                            </Link>
                        </p>
                    </div>
                    <div className="bg-white py-5 px-4 shadow sm:rounded-lg sm:px-10">
                        {isLoading ? (
                            <ProgressBar />
                        ) : (
                            <form
                                className="space-y-6"
                                action="#"
                                method="POST"
                                onSubmit={(e: any) => {
                                    e.preventDefault()
                                }}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={userCredentials.email}
                                            onChange={(e) => {
                                                setUserCredentials({
                                                    ...userCredentials,
                                                    email: e.target.value,
                                                })
                                                setErrorMessage("")
                                                setShowInputIncorrect(false)
                                            }}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] focus:outline-none focus:ring-[#29ADB2] sm:text-sm"
                                            style={{
                                                backgroundColor:
                                                    showInputIncorrect
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            value={userCredentials.password}
                                            onChange={(e) => {
                                                setUserCredentials({
                                                    ...userCredentials,
                                                    password: e.target.value,
                                                })
                                                setShowInputIncorrect(false)
                                            }}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] focus:outline-none focus:ring-[#29ADB2] sm:text-sm"
                                            style={{
                                                backgroundColor:
                                                    showInputIncorrect
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center  cursor-pointer">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600  cursor-pointer"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-3 block text-sm leading-6 text-gray-700 cursor-pointer"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm leading-6">
                                        <Link
                                            to={"/forgotpassword"}
                                            className="font-semibold text-gray-500 hover:text-gray-600"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        onClick={signInHandler}
                                        className="flex w-full justify-center rounded-md border border-transparent bg-[#29ADB2] py-2 px-4 text-md font-bold text-white shadow-sm hover:bg-[#59ADB2] focus:outline-none focus:ring-2 focus:ring-[#29ADB2] focus:ring-offset-2"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-4">
                            <InvalidInput content={errorMessage} />
                        </div>
                    </div>
                    <div className="w-12 h-[100vh]"></div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
