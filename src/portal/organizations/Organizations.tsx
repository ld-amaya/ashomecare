/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Organizations = () => {
	const [items, setItems] = useState<MenuItem[]>([]);
	const [search, setSearch] = useState<string>("");

	const home = { icon: "pi pi-home", url: "" };

	const navigate = useNavigate();

	useEffect(() => {
		setItems([
			{
				label: "Organizations",
			},
		]);
	}, []);

	return (
		<div className='w-full md:p-5 p-2'>
			<BreadCrumb home={home} model={items} className='border-0' />
			<Divider />
			<div className='flex flex-column gap-3'>
				<div className='flex gap-2 md:p-5 p-3'>
					<Button
						icon='pi pi-plus'
						onClick={() => {
							navigate("../locations/add");
						}}
					/>
					<InputText
						className='w-full'
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</div>
				<div className='flex flex-column p-5'></div>
			</div>
		</div>
	);
};
