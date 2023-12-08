import { useState, useCallback, useEffect } from "react"
import useAppSelector from "../../hooks/useAppSelector"

interface CraftProps {}

export default function Craft({}: CraftProps) {
    const token = useAppSelector((state) => state.auth.token)

    const URLpath = document.location.pathname.toString().split("/")
    const craftId: string =
        URLpath[URLpath.length - 1] === "craft"
            ? ""
            : URLpath[URLpath.length - 1]

    useEffect(() => {
        if (craftId) {
            // flowApi.request(token, craftId)
            console.log(craftId)
        }
    }, [])

    return <div>craft {craftId}</div>
}
