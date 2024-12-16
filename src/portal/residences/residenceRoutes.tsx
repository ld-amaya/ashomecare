// routes/residenceRoutes.ts
import { RouteObject } from "react-router-dom";
import { Residence } from "./views/Residence";
import { ResidenceEdit } from "./views/ResidenceEdit";


export const residenceRoutes: RouteObject[] = [
	{
		path: "residence",
		children: [
            { path: "", element: <Residence /> },
            { path: ":residenceId", element: <ResidenceEdit /> },
			{ path: "add", element: <ResidenceEdit /> },
			{ path: "edit/:residenceId", element: <ResidenceEdit /> },
		],
	},
];