import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Portal } from "./portal";
import { Locations } from "./portal/locations/Locations";
import { LocationEdit } from "./portal/locations/views/LocationEdit";
import { Location } from "./portal/locations/views/Location";
import { NavBar } from "./portal/navigation/NavBar";
import { SideBar } from "./portal/navigation/SideBar";
import { useState } from "react";
import { LocationContext } from "./portal/locations/LocationContext";
import { User } from "./portal/user/User";
import { Clients } from "./portal/clients/Clients";

export const Routes = () => {
    const [locationId, setLocationId] = useState<string>("");
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
							path: "settings",
							children: [
								{
									path: "",
									element: <Locations />,
								},
								{
									path: "locations",
									children: [
										{
											path: "",
											element: <Locations />,
										},
										{
											path: "add",
											element: <LocationEdit />,
										},
										{
											path: "edit/:locationId",
											element: <LocationEdit />,
										}
									],
                                },
                                {
                                    path: "clients",
                                    children: [
                                        {
                                            path: '',
                                            element: <Clients />
                                        }
                                    ]
                                }
							],
						},
						{
							path: "location",
							children: [
								{
									path: "",
									element: <Locations />,
								},
								{
									path: ":id",
									element: <Location />,
								},
								{
									path: ":id/clients",
									element: <User />,
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
        locationId, setLocationId,
        isSettings, setIsSettings
    };
    
	return (
		<div>
			<LocationContext.Provider value={ context }>
				<RouterProvider router={router} />
			</LocationContext.Provider>
		</div>
	);
};
