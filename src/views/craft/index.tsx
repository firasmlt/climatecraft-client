import { useState, useCallback, useEffect } from "react"
import useAppSelector from "../../hooks/useAppSelector"
import { CraftType } from "../../types/craft"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import useApi from "../../hooks/useApi"
import craft from "../../api/craft"
import { useNavigate } from "react-router-dom"

interface CraftProps {}

export default function Craft({}: CraftProps) {
    const token = useAppSelector((state) => state.auth.token)
    const navigate = useNavigate()

    const getCraftApi = useApi(craft.getOneCraft)
    const createCraftApi = useApi(craft.createCraft)
    const [craftInfo, setCraftInfo] = useState<CraftType>({
        id: "",
        title: "",
        description: "",
        photoUrl: "",
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    })

    const URLpath = document.location.pathname.toString().split("/")
    const craftId: string =
        URLpath[URLpath.length - 1] === "craft"
            ? ""
            : URLpath[URLpath.length - 1]

    useEffect(() => {
        if (getCraftApi.error) {
            navigate("/notfound")
        }
    }, [getCraftApi.error])

    useEffect(() => {
        if (craftId) {
            getCraftApi.request(token, craftId)
        }
    }, [])

    useEffect(() => {
        if (getCraftApi.data) {
            const craftInfo = getCraftApi.data.data
            setCraftInfo(craftInfo)
        }
    }, [getCraftApi.data, getCraftApi.error])

    const handleSave = (e: any) => {
        e.preventDefault()
        createCraftApi.request(token, craftInfo)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="mx-auto max-w-3xl">
                {/* Content goes here */}
                <form>
                    <div className="space-y-12 mt-8">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900 text-2xl">
                                {craftId ? "Edit Craft" : "Create Craft"}
                            </h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#59ADB2] sm:max-w-md">
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                autoComplete="username"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={craftInfo.title}
                                                onChange={(e) => {
                                                    setCraftInfo((prev) => {
                                                        return {
                                                            ...prev,
                                                            title: e.target
                                                                .value,
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Craft content
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#59ADB2] sm:text-sm sm:leading-6"
                                            value={craftInfo.description}
                                            onChange={(e) => {
                                                setCraftInfo((prev) => {
                                                    return {
                                                        ...prev,
                                                        description:
                                                            e.target.value,
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Photo URL
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#59ADB2] sm:max-w-md">
                                            <input
                                                type="text"
                                                name="photourl"
                                                id="photourl"
                                                autoComplete="photourl"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={craftInfo.photoUrl}
                                                onChange={(e) => {
                                                    setCraftInfo((prev) => {
                                                        return {
                                                            ...prev,
                                                            title: e.target
                                                                .value,
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-span-full">
                                    <label
                                        htmlFor="cover-photo"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon
                                                className="mx-auto h-12 w-12 text-gray-300"
                                                aria-hidden="true"
                                            />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[#59ADB2] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#59ADB2] focus-within:ring-offset-2 hover:text-[#29ADB2]"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    or drag and drop
                                                </p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
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
                            className="rounded-md bg-[#59ADB2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#29ADB2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#59ADB2]"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

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
