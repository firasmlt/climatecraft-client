import MinimalLayout from "../ui-components/layout/MinimalLayout"
import Craft from "../views/craft"
const FlowRoutes = {
    path: "/",
    element: <MinimalLayout />,
    children: [
        {
            path: "/craft/",
            element: <Craft />,
        },
        {
            path: "/craft/:id",
            element: <Craft />,
        },
    ],
}

export default FlowRoutes
