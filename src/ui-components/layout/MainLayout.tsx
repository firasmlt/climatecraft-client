import React, { useState, PropsWithChildren } from "react"

import { Outlet } from "react-router-dom"
import SidebarComponent from "../common/SidebarComponent"
import NavbarComponent from "../common/NavbarComponent"

const MemoizedSidebarComponent = React.memo(SidebarComponent)
const MemoizedNavbarComponent = React.memo(NavbarComponent)

// ==============================|| MAIN LAYOUT ||============================== //

interface MainLayoutProps extends PropsWithChildren {}
export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <MemoizedSidebarComponent
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="lg:pl-72">
                    <MemoizedNavbarComponent
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}
