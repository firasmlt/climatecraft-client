import { Navigate } from "react-router-dom"
import PrivateRoute from "./PrivateRoute" // Import the PrivateRoute component
import TimelinePage from "../views/timeline"
import LandingPage from "../views/landing"
import SettingsPage from "../views/settings"
const MainRoutes = {
    path: "/",
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
        {
            path: "settings",
            element: <PrivateRoute element={<SettingsPage />} />,
        },
        {
            path: "notfound",
            element: <h1>404 not found!</h1>,
        },
    ],
}

export default MainRoutes
