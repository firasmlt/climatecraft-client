import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import {
    CodeBracketIcon,
    EllipsisVerticalIcon,
    FlagIcon,
    StarIcon,
} from "@heroicons/react/20/solid"
import { CraftType } from "../../../types/craft"
import logo from "../../../assets/images/logo.png"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

interface CraftCardProps {
    craft: CraftType
}

export default function CraftCardComponents({ craft }: CraftCardProps) {
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl overflow-hidden shadow-md my-4">
            <img className="object-cover" src={logo} alt="Post" />
            <div className="p-6">
                <h2 className="font-bold text-xl mb-2">{craft.title}</h2>
                <p className="text-gray-700">{craft.description}</p>
            </div>
        </div>
    )
}
