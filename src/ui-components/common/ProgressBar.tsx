import React, { useEffect, useState } from "react"

const ProgressBar: React.FC = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress + 0.3) % 100)
        }, 1)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="absolute left-0 top-0 w-[100vw] z-50 h-[2px] bg-green-100">
            <div
                className="absolute h-full bg-[#29ADB2]"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}

export default ProgressBar
