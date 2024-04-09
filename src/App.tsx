/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Portal } from "./portal";
import { Locations } from "./portal/locations/Locations";
import { LocationAdd } from "./portal/locations/views/LocationAdd";


export const App = () => {
    const router = createBrowserRouter([
			{
				path: "/",
				element: <Portal />,
			},
			{
				path: "/portal",
				children: [
					{
						path: "",
						element: <Portal />,
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
								element: <LocationAdd />,
							},
							{
								path: "edit/:locationId",
								element: <Locations />,
							},
						],
					},
				],
			},
		]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};
