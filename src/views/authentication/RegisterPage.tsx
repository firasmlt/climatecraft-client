import { useEffect, useState } from "react"
import useAppSelector from "../../hooks/useAppSelector"
import {
    googleAuthenticateUser,
    loginUser,
    registerUser,
    reset,
} from "../../features/auth/authSlice"
import { UserCredentials, UserData } from "../../types/auth"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../ui-components/common/LoadingSpinner"
import InvalidInput from "../../ui-components/auth/InvalidInput"
import useThunkDispatch from "../../hooks/useThunkDispatch"
import ProgressBar from "../../ui-components/common/ProgressBar"
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import GoogleImage from "../../assets/images/google.png"
import AuthHeader from "./AuthHeader"

const RegisterPage = () => {
    // state
    const [unvalidProperties, setUnvalidProperties] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")

    const { isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.auth
    )

    // dispatch function
    const dispatch = useThunkDispatch()
    // router
    const navigate = useNavigate()

    const onResponse = (response: any) => {
        console.log("success")
        console.log(response)
    }
    const onError = () => {
        console.log("error")
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) =>
            console.log(
                "successs: ",
                dispatch(googleAuthenticateUser(codeResponse.access_token))
            ),
        onError: (error) => console.log("Login Failed:", error),
    })

    // handlers
    const validPassword: RegExp = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    )

    const signUpHandler = (e: any) => {
        e.preventDefault()
        setErrorMessage("")

        if (userData.firstName.length < 3) {
            const errorMessage = "Invalid first name"
            setUnvalidProperties(["firstname"])
            return setErrorMessage(errorMessage)
        }
        if (userData.lastName.length < 3) {
            const errorMessage = "Invalid last name"
            setUnvalidProperties(["lastname"])
            return setErrorMessage(errorMessage)
        }

        if (
            !userData.email.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            const errorMessage = "Invalid email address"
            setUnvalidProperties(["email"])
            return setErrorMessage(errorMessage)
        }

        if (!validPassword.test(userData.password)) {
            const errorMessage = "Invlaid Password"

            setUnvalidProperties(["password"])
            return setErrorMessage(errorMessage)
        }

        if (userData.password !== passwordConfirm) {
            const errorMessage = "Passwords do not match"
            setUnvalidProperties(["passwords"])
            return setErrorMessage(errorMessage)
        }
        dispatch(registerUser(userData))
    }

    useEffect(() => {
        if (isError) {
            if (message.toLowerCase().includes("invalid email")) {
                const errorMessage = "Invalid email address"
                setUnvalidProperties(["email"])
                setErrorMessage(errorMessage)
                return
            }

            if (message.toLowerCase().includes("email already")) {
                const errorMessage = "Email address already in use"
                setUnvalidProperties(["email"])
                setErrorMessage(errorMessage)
                return
            }
            const errorMessage = "Error! Try again later."
            setErrorMessage(errorMessage)
        }

        if (isSuccess) {
            navigate("/timeline")
        }

        if (isLoading) {
            setErrorMessage("")
        }
    }, [isError, isLoading, isSuccess, message])

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <>
            <AuthHeader type="login" />
            <div
                className={`flex min-h-full flex-col justify-center py-2 sm:px-6 lg:px-8`}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div>
                        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Welcome to{" "}
                            <span className="text-[#29ADB2]">CLIMATECRAFT</span>
                        </h2>
                        <p className="mt-2 mb-3 text-sm leading-6 text-gray-500 text-center">
                            Already a member?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-black hover:text-gray-800"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                    <div className="bg-white py-5 px-4 shadow sm:rounded-lg sm:px-10">
                        {isLoading || isSuccess ? <ProgressBar /> : <></>}
                        <form
                            className="space-y-6 mb-6"
                            action="#"
                            method="POST"
                            onChange={() => {
                                setErrorMessage("")
                            }}
                        >
                            <div>
                                <label
                                    htmlFor="firstname"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        autoComplete="on"
                                        value={userData.firstName}
                                        onChange={(e) => {
                                            setUnvalidProperties((prev) =>
                                                prev.filter(
                                                    (p) => p !== "firstname"
                                                )
                                            )
                                            setUserData({
                                                ...userData,
                                                firstName: e.target.value,
                                            })
                                        }}
                                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] q focus:outline-none focus:ring-[#29ADB2] sm:text-sm`}
                                        style={{
                                            backgroundColor:
                                                unvalidProperties.includes(
                                                    "firstname"
                                                )
                                                    ? "#FEF2F2"
                                                    : "",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="lastname"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        autoComplete="on"
                                        value={userData.lastName}
                                        onChange={(e) => {
                                            setUnvalidProperties((prev) =>
                                                prev.filter(
                                                    (p) => p !== "lastname"
                                                )
                                            )
                                            setUserData({
                                                ...userData,
                                                lastName: e.target.value,
                                            })
                                        }}
                                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] q focus:outline-none focus:ring-[#29ADB2] sm:text-sm`}
                                        style={{
                                            backgroundColor:
                                                unvalidProperties.includes(
                                                    "lastname"
                                                )
                                                    ? "#FEF2F2"
                                                    : "",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email:
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={userData.email}
                                        onChange={(e) => {
                                            setUnvalidProperties((prev) =>
                                                prev.filter(
                                                    (p) => p !== "email"
                                                )
                                            )
                                            setUserData({
                                                ...userData,
                                                email: e.target.value,
                                            })
                                        }}
                                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] q focus:outline-none focus:ring-[#29ADB2] sm:text-sm`}
                                        style={{
                                            backgroundColor:
                                                unvalidProperties.includes(
                                                    "email"
                                                )
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
                                        required
                                        value={userData.password}
                                        onChange={(e) => {
                                            setUnvalidProperties((prev) =>
                                                prev.filter(
                                                    (p) => p !== "password"
                                                )
                                            )
                                            setUserData({
                                                ...userData,
                                                password: e.target.value,
                                            })
                                        }}
                                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] q focus:outline-none focus:ring-[#29ADB2] sm:text-sm`}
                                        style={{
                                            backgroundColor:
                                                unvalidProperties.includes(
                                                    "password"
                                                )
                                                    ? "#FEF2F2"
                                                    : "",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="passwordConfirm"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={passwordConfirm}
                                        onChange={(e) => {
                                            setUnvalidProperties((prev) =>
                                                prev.filter(
                                                    (p) => p !== "passwords"
                                                )
                                            )
                                            setPasswordConfirm(e.target.value)
                                        }}
                                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#29ADB2] q focus:outline-none focus:ring-[#29ADB2] sm:text-sm`}
                                        style={{
                                            backgroundColor:
                                                unvalidProperties.includes(
                                                    "passwords"
                                                )
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
                                    <a
                                        href="#"
                                        className="font-semibold text-gray-500 hover:text-gray-600"
                                    >
                                        Need Help?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={signUpHandler}
                                    className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-[#29ADB2] hover:bg-[#59ADB2] focus:outline-none focus:ring-2 focus:ring-[#29ADB2] focus:ring-offset-2 "
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className="mt-4">
                            <InvalidInput content={errorMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
