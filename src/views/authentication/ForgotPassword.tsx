import axios from "axios"
import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import InvalidInput from "../../ui-components/auth/InvalidInput"
import ProgressBar from "../../ui-components/common/ProgressBar"
import { Transition } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

type Props = {}

type EmailSentProps = {
    show: boolean
}

const EmailSentComponent = ({ show }: EmailSentProps) => {
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
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
                                            Reset Email Sent!
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Check your mail box to find the
                                            reset link
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

const ForgotPassword = (props: Props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const validateEmail = (email: string) =>
        email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )

    const sendEmailHandler = async (e: any) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            return setErrorMessage("invalid email address")
        }
        setLoading(true)
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/reset`,
                {
                    email: email,
                }
            )
            if (response.status === 200) {
                setShow(true)
                setEmail("")
            }
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            if (err?.response?.status === 404) {
                setErrorMessage("No user found with email address!")
            }
        }
    }

    return (
        <>
            {loading && <ProgressBar />}
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Password Reset
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-300 focus:outline-none focus:ring-[#60b0bd] sm:text-sm"
                                        value={email}
                                        placeholder="type your email address"
                                        onChange={(e) => {
                                            setErrorMessage("")
                                            setEmail(e.target.value)
                                        }}
                                        style={{
                                            backgroundColor:
                                                errorMessage.includes("email")
                                                    ? "#FEF2F2"
                                                    : "",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-red-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-[#60b0bd] focus:outline-none focus:ring-2 focus:ring-[#29ADB2] focus:ring-offset-2"
                                    onClick={sendEmailHandler}
                                >
                                    Send Link
                                </button>
                            </div>
                        </form>
                        <br></br>
                        <InvalidInput content={errorMessage} />
                    </div>
                </div>
                <EmailSentComponent show={show} />
            </div>
        </>
    )
}

export default ForgotPassword
