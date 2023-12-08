import { useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import useApi from "../../hooks/useApi"
import craft from "../../api/craft"
import useAppSelector from "../../hooks/useAppSelector"
import ProgressBar from "../../ui-components/common/ProgressBar"

interface Props {}

export default function TimelinePage({}: Props) {
    // const token = useAppSelector((state) => state.auth.token)
    // const navigate = useNavigate()

    // const [processFlows, setProcessFlows] = useState<ProcessFlowType[]>([])
    // const handleAddProcessFlow = () => {
    //     navigate("/canvas")
    // }
    // const flowApi = useApi(flow.getAllUserFlows)
    // useEffect(() => {
    //     flowApi.request(token)
    // }, [])

    // useEffect(() => {
    //     if (flowApi.data) {
    //         setProcessFlows(flowApi.data.data)
    //     }

    //     if (flowApi.error) {
    //         console.log(flowApi.error)
    //     }
    // }, [flowApi.data, flowApi.error])
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-9">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 text-xl">
                        Craft
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the crafts you created.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="rounded-full bg-red-500 p-2 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        // onClick={handleAddProcessFlow}
                    >
                        <PlusIcon className="h-7 w-7" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        {/* {flowApi.loading ? (
                            <ProgressBar />
                        ) : (
                            <ProcessflowsTable
                                setProcessFlows={setProcessFlows}
                                processFlows={processFlows}
                            />
                        )} */}
                        dd
                    </div>
                </div>
            </div>
        </div>
    )
}
