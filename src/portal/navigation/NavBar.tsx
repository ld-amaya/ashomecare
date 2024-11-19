/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { ResidenceInfo } from "../residences/models/Residence";
import { useResidenceManager } from "../residences/manager/ResidenceModule";
import { useResidenceContext } from "../residences/ResidenceContext";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

export const NavBar = () => {
	const { setResidenceId, setIsSettings } = useResidenceContext();
	const [residences, setResidences] = useState<ResidenceInfo[]>([]);
	const [residenceItems, setResidenceItems] = useState<Record<string, any>[]>([]);

	const menu = useRef(null);
	const navigate = useNavigate();
	const residenceManager = useResidenceManager();

	useEffect(() => {
		getResidences();
	}, []);

	useEffect(() => {
		if (!residences) return;

		const locItems = residences.map((loc) => {
			return {
				label: loc.name,
				command: () => {
					setResidenceId(loc.id);
					setIsSettings(false);
					navigate(`../portal/residence/${loc.id}`);
				},
			};
		});
		setResidenceItems(locItems);
	}, [residences]);

	const getResidences = async () => {
		const residenceList: ResidenceInfo[] = await residenceManager.getResidenceList();
		if (residenceList.length) {
			setResidences(residenceList);
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
			label: "Residences",
			icon: "pi pi-compass",
			items: residenceItems,
			command: () => console.log("*** Hi Lou"),
		},
	];

	const settingsMenu: MenuItem[] = [
		{
			label: 'Settings',
			icon: 'pi pi-cog',
			command: () => {
				setIsSettings(true)
				navigate('../portal/settings/residence', { replace: true })
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
