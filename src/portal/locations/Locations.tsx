/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { LocationInfo } from "./models/location";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";
import { useLocationManager } from "./manager/LocationModule";

export const Locations = () => {
	const [search, setSearch] = useState<string>("");
	const [locations, setLocations] = useState<LocationInfo[]>([]);
	const [items, setItems] = useState<MenuItem[]>([]);
	const locationManager = useLocationManager();

	const navigate = useNavigate();

	const home = { icon: "pi pi-building", url: "" };

	useEffect(() => {
		setItems([
			{
				label: "Locations",
			},
		]);
		const getLocationInfo = async () => {
			const locInfo: LocationInfo[] = await locationManager.getLocationList();
			setLocations(locInfo);
		};
		getLocationInfo();
	}, []);

	const displayLocations = (): JSX.Element => {
		const element = locations?.map((location, idx) => {
			const address = `${location.address.address1}, ${location.address.city}, ${location.address.state}, ${location.address.zip}`;
			const header = (
				<div className='flex justify-content-between'>
					<div>{location.name}</div>
					<div>
						<i
							className='pi pi-pencil cursor-pointer'
							onClick={() => {
								navigate(`../locations/edit/${location.id}`);
							}}
						/>
					</div>
				</div>
			);
			return (
				<div className='md:w-3 w-full' key={idx}>
					<Card title={header}>
						<div className='flex flex-column gap-3 px-3'>
							<div className='flex gap-3'>
								<div>
									<i className='pi pi-compass' />
								</div>
								<div>{address}</div>
							</div>
						</div>
					</Card>
				</div>
			);
		});

		return <div className="flex flex-row flex-wrap gap-4">{element || <></>}</div>;
	};

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
				<div className='flex flex-column p-5'>
					{displayLocations()}
				</div>
			</div>
		</div>
	);
};
