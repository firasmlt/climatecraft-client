import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import ProgressBar from "../../ui-components/common/ProgressBar"
import { logoutUser, reset } from "../../features/auth/authSlice"
import user from "../../api/user"
import useApi from "../../hooks/useApi"
import useAppDispatch from "../../hooks/useAppDispatch"
import useThunkDispatch from "../../hooks/useThunkDispatch"

type Props = {}

const ConfirmEmail = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useThunkDispatch()
    const [queryParameters] = useSearchParams()

    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    const confirmEmailApi = useApi(user.confirmEmailApi)

    const token = queryParameters.get("token")
    // if (!token) navigate("/login")
    useEffect(() => {
        if (token) {
            confirmEmailApi.request(token)
        } else {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if (confirmEmailApi.data) {
            setLoading(false)
            dispatch(logoutUser())
        }

        if (confirmEmailApi.error) {
            navigate("/login")
        }
    }, [confirmEmailApi.data, confirmEmailApi.error])

    return (
        <>
            {!confirmEmailApi.data && !confirmEmailApi.error ? (
                <ProgressBar />
            ) : (
                <Transition.Root show={true} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => {}}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center items-center p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
                                    enterTo="opacity-100 translate-y-0 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 scale-100"
                                    leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all my-8 w-full max-w-sm p-6">
                                        <div>
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon
                                                    className="h-6 w-6 text-green-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="mt-3 text-center mt-5">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Email Verified Successfully
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        your email address has
                                                        been verified
                                                        successfully
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#60b0bd] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#58a1ad] focus:outline-none focus:ring-2 focus:ring-[#60b0bd] focus:ring-offset-2 text-sm"
                                                onClick={() => {
                                                    dispatch(reset())
                                                    navigate("/dashboard")
                                                }}
                                            >
                                                Go To Login Page
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}
        </>
    )
}

export default ConfirmEmail
