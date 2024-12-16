import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Portal } from "./portal";
import { useState } from "react";
import { ResidenceContext } from "./portal/residences/ResidenceContext";
import { residenceRoutes } from "./portal/residences/residenceRoutes";
import { organizationRoutes } from "./portal/organizations/organizationRoutes";
import { clientRoutes } from "./portal/clients/clientRoutes";
import { ResidenceEdit } from "./portal/residences/views/ResidenceEdit";
import { MainMenu } from "./MainMenu";

export const AppRoutes = () => {
    const [residenceId, setResidenceId] = useState<string>("");
    const [isSettings, setIsSettings] = useState<boolean>(false);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainMenu />,
			children: [
				{
					path: "/portal",
					children: [
						{
							path: "",
							element: <Portal />,
						},
						{
							path: "residence",
							children: [
								{ path: ":id", element: <ResidenceEdit /> }
							]
						},
						{
							path: "settings",
							children: [
								...residenceRoutes,
								...organizationRoutes,
								...clientRoutes
							],
						},
					],
				},
			],
		},
	]);

    const context = {
        residenceId, setResidenceId,
        isSettings, setIsSettings
    };
    
	return (
		<div>
			<ResidenceContext.Provider value={context}>
				<RouterProvider router={router} />
			</ResidenceContext.Provider>
		</div>
	);
};
