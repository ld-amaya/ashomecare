import { RouteObject } from "react-router-dom";
import { Clients } from "./Clients";

export const clientRoutes: RouteObject[] = [
    {
        path: "organizations",
        children: [
            {
                path: "",
                element: <Clients />,
            },
        ],
    },
];
