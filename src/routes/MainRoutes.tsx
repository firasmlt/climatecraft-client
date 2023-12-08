import { Navigate } from "react-router-dom"
import MainLayout from "../ui-components/layout/MainLayout"
import PrivateRoute from "./PrivateRoute" // Import the PrivateRoute component
import TimelinePage from "../views/timeline"
import LandingPage from "../views/landing"
const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            // Set an index route for '/'
            index: true,
            element: <LandingPage />, // Redirect to '/dashboard'
        },
        {
            path: "timeline",
            element: <PrivateRoute element={<TimelinePage />} />,
        },
    ],
}

export default MainRoutes
