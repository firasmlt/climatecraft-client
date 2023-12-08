import { useDispatch } from "react-redux"
import { RootState } from "../app/store"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"

const useThunkDispatch = () =>
    useDispatch<ThunkDispatch<RootState, any, AnyAction>>()

export default useThunkDispatch
