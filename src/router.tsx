import { createBrowserRouter } from "react-router-dom"

import Home from "./view/Home/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
])
