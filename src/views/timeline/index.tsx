import { Fragment, useEffect, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    PlusIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router-dom"
import { CraftType } from "../../types/craft"
import CraftCardComponents from "./components/CraftComponent"
import useAppSelector from "../../hooks/useAppSelector"
import useApi from "../../hooks/useApi"
import craft from "../../api/craft"
import EarthCanvas from "../../ui-components/common/earth"

const navigation = [
    { name: "Timeline", href: "/timeline", icon: HomeIcon, current: false },
    { name: "Craft Mates", href: "#", icon: UsersIcon, current: false },
    {
        name: "Your Crafts",
        href: "#",
        icon: DocumentDuplicateIcon,
        current: false,
    },
]
const teams = [
    {
        id: 1,
        name: "Denis Villeneuve",
        href: "#",
        initial: "D",
        current: false,
    },
    { id: 2, name: "Travis Kelce", href: "#", initial: "T", current: false },
    { id: 3, name: "Walker Hayes", href: "#", initial: "W", current: false },
]
const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

export default function Timeline() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [craftList, setCraftList] = useState<CraftType[]>([
        {
            id: "dfsa",
            title: "test1",
            description: "fdsafdsa",
            photoUrl: "",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        },
        {
            id: "dfsafdsa",
            title: "test1",
            description: "fdsafdsa",
            createdAt: new Date().toDateString(),
            photoUrl: "",
            updatedAt: new Date().toDateString(),
        },
        {
            id: "dffdsafdsasa",
            title: "test1",
            description: "fdsafdsa",
            createdAt: new Date().toDateString(),
            photoUrl: "",
            updatedAt: new Date().toDateString(),
        },
        {
            id: "dfsfdsaa",
            title: "test1",
            description: "fdsafdsa",
            photoUrl: "",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        },
    ])
    const token = useAppSelector((state) => state.auth.token)
    const getCraftsApi = useApi(craft.getAllUserCrafts)
    // const navigate = useNavigate()

    // const [processFlows, setProcessFlows] = useState<ProcessFlowType[]>([])
    // const handleAddProcessFlow = () => {
    //     navigate("/canvas")
    // }
    // const flowApi = useApi(flow.getAllUserFlows)
    useEffect(() => {
        getCraftsApi.request(token)
    }, [])

    useEffect(() => {
        if (getCraftsApi.data) {
            setCraftList(getCraftsApi.data.data)
        }

        if (getCraftsApi.error) {
            console.log(getCraftsApi.error)
        }
    }, [getCraftsApi.data, getCraftsApi.error])

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Link
                                                to="/timeline"
                                                className="-m-1.5 p-1.5 flex items-center gap-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-8 h-8 text-[#29ADB2]"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 01-1.384-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.279-2.132z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="text-[#29ADB2] font-bold">
                                                    CLIMATECRAFT
                                                </span>
                                            </Link>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7"
                                            >
                                                <li>
                                                    <ul
                                                        role="list"
                                                        className="-mx-2 space-y-1"
                                                    >
                                                        {navigation.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    <Link
                                                                        to={
                                                                            item.href
                                                                        }
                                                                        className={classNames(
                                                                            item.current
                                                                                ? "bg-gray-50 text-indigo-600"
                                                                                : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                        )}
                                                                    >
                                                                        <item.icon
                                                                            className={classNames(
                                                                                item.current
                                                                                    ? "text-indigo-600"
                                                                                    : "text-gray-400 group-hover:text-indigo-600",
                                                                                "h-6 w-6 shrink-0"
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="text-xs font-semibold leading-6 text-gray-400">
                                                        Your teams
                                                    </div>
                                                    <ul
                                                        role="list"
                                                        className="-mx-2 mt-2 space-y-1"
                                                    >
                                                        {teams.map((team) => (
                                                            <li key={team.name}>
                                                                <Link
                                                                    to={
                                                                        team.href
                                                                    }
                                                                    className={classNames(
                                                                        team.current
                                                                            ? "bg-gray-50 text-indigo-600"
                                                                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={classNames(
                                                                            team.current
                                                                                ? "text-indigo-600 border-indigo-600"
                                                                                : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                                                        )}
                                                                    >
                                                                        {
                                                                            team.initial
                                                                        }
                                                                    </span>
                                                                    <span className="truncate">
                                                                        {
                                                                            team.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    <Link
                                                        to="/settings"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                                    >
                                                        <Cog6ToothIcon
                                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                                            aria-hidden="true"
                                                        />
                                                        Settings
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <Link
                                to="/timeline"
                                className="-m-1.5 p-1.5 flex items-center gap-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8 text-[#29ADB2]"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 01-1.384-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.279-2.132z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-[#29ADB2] font-bold">
                                    CLIMATECRAFT
                                </span>
                            </Link>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-50 text-indigo-600"
                                                            : "text-gray-700 hover:text-[#59ADB2] hover:bg-gray-50",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? "text-indigo-600"
                                                                : "text-gray-400 group-hover:text-[#59ADB2]",
                                                            "h-6 w-6 shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-gray-400">
                                        Your Craft Mates
                                    </div>
                                    <ul
                                        role="list"
                                        className="-mx-2 mt-2 space-y-1"
                                    >
                                        {teams.map((team) => (
                                            <li key={team.name}>
                                                <Link
                                                    to={team.href}
                                                    className={classNames(
                                                        team.current
                                                            ? "bg-gray-50 text-indigo-600"
                                                            : "text-gray-700 hover:text-[#59ADB2] hover:bg-gray-50",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}
                                                >
                                                    <span
                                                        className={classNames(
                                                            team.current
                                                                ? "text-indigo-600 border-indigo-600"
                                                                : "text-gray-400 border-gray-200 group-hover:border-[#59ADB2] group-hover:text-[#59ADB2]",
                                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                                        )}
                                                    >
                                                        {team.initial}
                                                    </span>
                                                    <span className="truncate">
                                                        {team.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <Link
                                        to="/settings"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-[#59ADB2]"
                                    >
                                        <Cog6ToothIcon
                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-[#59ADB2]"
                                            aria-hidden="true"
                                        />
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold leading-6 text-gray-900 text-xl">
                                        Crafts
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        A list of all the crafts created.
                                    </p>
                                </div>
                                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <Link to={`/craft`}>
                                        <button
                                            type="button"
                                            className="rounded-full bg-[#29ADB2] p-2 text-white shadow-sm hover:bg-[#59ADB2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            // onClick={handleAddProcessFlow}
                                        >
                                            <PlusIcon
                                                className="h-7 w-7"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
                                <EarthCanvas />
                            </div>
                            {craftList.map((craft: CraftType) => (
                                <Link to={`/craft/${craft.id}`}>
                                    <CraftCardComponents craft={craft} />
                                </Link>
                            ))}
                            {craftList.length === 0 && (
                                <p className="text-md text-gray-600">
                                    no crafts yet.
                                </p>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
