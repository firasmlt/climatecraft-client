import Craft from "../views/craft"
const CraftRoutes = {
    path: "/",
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

export default CraftRoutes
