/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import useAppSelector from "../../hooks/useAppSelector"
import useApi from "../../hooks/useApi"
import user from "../../api/user"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SettingsPage() {
    const token = useAppSelector((state) => state.auth.token)
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })
    const navigate = useNavigate()
    const userApi = useApi(user.getAuthenticatedUserInfoApi)

    useEffect(() => {
        if (userApi.error) {
            navigate("/notfound")
        }
    }, [userApi.error])

    useEffect(() => {
        userApi.request(token)
    }, [])

    useEffect(() => {
        if (userApi.data) {
            const userInfo = userApi.data.data
            setUserInfo(userInfo)
        }
    }, [userApi.data, userApi.error])

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
            <div className="mx-auto max-w-3xl">
                <div className="space-y-10 divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Personal Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
                            </p>
                        </div>

                        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#29ADB2] sm:text-sm sm:leading-6"
                                                value={userInfo.firstName}
                                                onChange={(e) => {
                                                    setUserInfo((prev) => {
                                                        return {
                                                            ...prev,
                                                            firstName:
                                                                e.target.value,
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#29ADB2] sm:text-sm sm:leading-6"
                                                value={userInfo.lastName}
                                                onChange={(e) => {
                                                    setUserInfo((prev) => {
                                                        return {
                                                            ...prev,
                                                            lastName:
                                                                e.target.value,
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Old Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#29ADB2] sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            New Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#29ADB2] sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button
                                    type="button"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                    onClick={() => {
                                        navigate("/timeline")
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-[#29ADB2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#59ADB2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29ADB2]"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
