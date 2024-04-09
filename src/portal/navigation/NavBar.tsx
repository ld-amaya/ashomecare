/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { LocationInfo } from "../locations/models/location";
import { useLocationManager } from "../locations/manager/LocationModule";
import { useLocationContext } from "../locations/LocationContext";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

export const NavBar = () => {
	const { setLocationId, setIsSettings } = useLocationContext();
	const [locations, setLocations] = useState<LocationInfo[]>([]);
	const [locationItems, setLocationItems] = useState<Record<string, any>[]>([]);

	const menu = useRef(null);
	const navigate = useNavigate();
	const locationManager = useLocationManager();

	useEffect(() => {
		getLocations();
	}, []);

	useEffect(() => {
		if (!locations) return;

		const locItems = locations.map((loc) => {
			return {
				label: loc.name,
				command: () => {
					setLocationId(loc.id);
					setIsSettings(false);
					navigate(`../portal/location/${loc.id}`);
				},
			};
		});
		setLocationItems(locItems);
	}, [locations]);

	const getLocations = async () => {
		const locationList: LocationInfo[] = await locationManager.getLocationList();
		if (locationList.length) {
			setLocations(locationList);
		}
	};

	const items: MenuItem[] = [
		{
			label: "Home",
			icon: "pi pi-home",
			command: () => {
				setIsSettings(false)
				navigate(`../portal`, { replace: false });
			},
		},
		{
			label: "Locations",
			icon: "pi pi-compass",
			items: locationItems,
			command: () => console.log("*** Hi Lou"),
		},
	];

	const settingsMenu: MenuItem[] = [
		{
			label: 'Settings',
			icon: 'pi pi-cog',
			command: () => {
				setIsSettings(true)
				navigate('../portal/settings/locations', { replace: true })
			}
		}
	]

	const end = (
		<div className='flex align-items-center gap-2'>
			<InputText
				placeholder='Search'
				type='text'
				className='w-8rem sm:w-auto'
			/>
			<Menu model={settingsMenu} popup ref={menu} />
			<Button icon='pi pi-bars' onClick={(e) => menu.current.toggle(e)} />
		</div>
	);

	return (
		<div className='w-full'>
			<Menubar
				className='bg-primary-200'
				model={items}
				end={end}
			/>
		</div>
	);
};
