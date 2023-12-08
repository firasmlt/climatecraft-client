import axios from "axios"
import { useEffect, useState, Fragment } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import ProgressBar from "../../ui-components/common/ProgressBar"
import InvalidInput from "../../ui-components/auth/InvalidInput"
import { logoutUser } from "../../features/auth/authSlice"
import { Transition } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

type Props = {}

const ResetPassword = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [queryParameters] = useSearchParams()
    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const [loading, setLoading] = useState(true)

    const [newPassword, setNewPassword] = useState({
        password: "",
        passwordConfirm: "",
    })

    const token = queryParameters.get("token")
    if (!token) navigate("/login")
    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/verifyToken`, {
                resetToken: token,
            })
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false)
                    dispatch(logoutUser())
                } else {
                    navigate("/login")
                }
            })
            .catch((err) => navigate("/login"))
    }, [])

    // handler
    const validPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    )
    const newPasswordHandler = async (e: any) => {
        e.preventDefault()
        if (!validPassword.test(newPassword.password))
            return setErrorMessage(
                "password must be at least eight characters long and contain numbers"
            )

        if (newPassword.password !== newPassword.passwordConfirm) {
            return setErrorMessage("passwords do not match!")
        }
        setLoading(true)
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/newPassword`,
                {
                    resetToken: token,
                    newPassword: newPassword.password,
                }
            )

            setSuccess(true)
            setLoading(false)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (err: any) {
            if (err?.response?.status === 400) {
                setLoading(false)
                return setErrorMessage("Cannot use that password!")
            }
            navigate("/notfound")
        }
    }

    return (
        <>
            {loading && <ProgressBar />}
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create a new password
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form
                            className="space-y-6"
                            action="#"
                            method="POST"
                            onChange={() => setErrorMessage("")}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-300 focus:outline-none focus:ring-[#29ADB2] sm:text-sm"
                                        value={newPassword.password}
                                        onChange={(e) => {
                                            setNewPassword({
                                                ...newPassword,
                                                password: e.target.value,
                                            })
                                        }}
                                        style={{
                                            backgroundColor:
                                                errorMessage.includes(
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
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    confirm password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-300 focus:outline-none focus:ring-[#29ADB2] sm:text-sm"
                                        value={newPassword.passwordConfirm}
                                        onChange={(e) =>
                                            setNewPassword({
                                                ...newPassword,
                                                passwordConfirm: e.target.value,
                                            })
                                        }
                                        style={{
                                            backgroundColor:
                                                errorMessage.includes(
                                                    "password"
                                                )
                                                    ? "#FEF2F2"
                                                    : "",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-red-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-[#29ADB2] focus:ring-offset-2"
                                    onClick={newPasswordHandler}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <br></br>
                        <InvalidInput content={errorMessage} />
                    </div>

                    <div
                        aria-live="assertive"
                        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                    >
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                            <Transition
                                show={success}
                                as={Fragment}
                                enter="transform ease-out duration-300 transition"
                                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <CheckCircleIcon
                                                    className="h-6 w-6 text-green-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                                <p className="text-sm font-medium text-gray-900">
                                                    Password Changed
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Redirecting to Login Page...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
