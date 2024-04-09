/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import React from "react";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate, useNavigation } from "react-router-dom";
import { useNavigationManager } from "./manager/NavigationModule";

export const Menu = () => {

	const path = `${window.location.host}/portal`;
	const navigate = useNavigate();

	const items: MenuItem[] = [
		{
			label: "Home",
			icon: "pi pi-home",
			command: () => {
				console.log("I am clicked to home");
				
			},
		},
		{
			label: "Locations",
			icon: "pi pi=home",
			command: () => {
				navigate(`${path}/locations`, {replace: false})
			},
		},
	];

	return (
		<div>
			<Menubar model={items} />
		</div>
	);
};
