import { RouteObject } from "react-router-dom";
import { Organizations } from "./Organizations";

export const organizationRoutes: RouteObject[] = [
	{
		path: "organizations",
		children: [
			{
				path: "",
				element: <Organizations />,
			},
		],
	},
];
