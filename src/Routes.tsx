import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Portal } from "./portal";
import { Residence } from "./portal/residences/Residence";
import { ResidenceEdit } from "./portal/residences/views/ResidenceEdit";
import { NavBar } from "./portal/navigation/NavBar";
import { SideBar } from "./portal/navigation/SideBar";
import { useState } from "react";
import { ResidenceContext } from "./portal/residences/ResidenceContext";
import { User } from "./portal/user/User";
import { Clients } from "./portal/clients/Clients";
import { Organizations } from "./portal/organizations/Organizations";

export const Routes = () => {
    const [residenceId, setResidenceId] = useState<string>("");
    const [isSettings, setIsSettings] = useState<boolean>(false);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Mainmenu />,
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
								{
									path: "",
									element: <Residence />,
								},
								{
									path: ":id",
									element: <Residence />,
								},
								{
									path: ":id/clients",
									element: <User />,
								},
							],
						},
						{
							path: "settings",
							children: [
								{
									path: "",
									element: <Residence />,
								},
								{
									path: "residence",
									children: [
										{
											path: "",
											element: <Residence />,
										},
										{
											path: "add",
											element: <ResidenceEdit />,
										},
										{
											path: "edit/:residenceId",
											element: <ResidenceEdit />,
										},
									],
								},
								{
									path: "organizations",
									children: [
										{
											path: "",
											element: <Organizations />,
										},
									],
								},
								{
									path: "clients",
									children: [
										{
											path: "",
											element: <Clients />,
										},
									],
								},
							],
						},
					],
				},
			],
		},
	]);

	function Mainmenu() {
		return (
			<div className='flex flex-column'>
				<div>
					<NavBar />
				</div>
                <div className='flex md:flex-row flex-column'>
                    <SideBar />
					<Outlet />
				</div>
			</div>
		);
	}

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
