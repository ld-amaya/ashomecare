/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Menu } from "../navigation/MenuBar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { LocationInfo } from "./models/location";
import { Address } from "../../models/Address";
import { useLocationManager } from "./manager/LocationModule";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";


const address: Address = {
	address1: "25926 Hickory Ave",
	city: "Hayward",
	state: "CA",
	zip: "95035",
};

const loc: LocationInfo = {
	address: address,
	name: "Hayward",
	id: "location1",
	landline: "408-981-7151",
};

const owner: User = {
    id: "user123",
    firstName: "Lou",
    lastName: "Amaya",
    type: 'admin'
}


export const Locations = () => {
	const [search, setSearch] = useState<string>("");
	const [locations, setLocations] = useState<LocationInfo[]>([]);

	const locationManager = useLocationManager();
	const navigate = useNavigate();
    
    useEffect(() => {
		const getLocationInfo = async () => {
			const locInfo: LocationInfo[] = await locationManager.getLocationList();
			setLocations(locInfo);
		}
		getLocationInfo()
	}, []);

	const displayLocations = (): JSX.Element => {
		const element = locations?.map((location, idx) => {
			const address = `${location.address.address1}, ${location.address.city}, ${location.address.state}, ${location.address.zip}`;
			const header = (
				<div className='flex justify-content-between'>
					<div>{location.name}</div>
					<div>
						<i
							className='pi pi-pencil'
							onClick={() => console.log("*** Editing")}
						/>
					</div>
				</div>
			);
			return (
				<div key={ idx }>
					<Card title={header} className='px-3'>
						<div className='flex flex-column gap-3'>
							<div>
								<i className='pi pi-compass' /> {address}
							</div>
							<div>
								<i className='pi pi-phone' /> {location.landline}
							</div>
						</div>
					</Card>
				</div>
			);
		}) || <></>;

		return <div>{element}</div>;
	};
	return (
		<div className='flex flex-column gap-3 px-5'>
			<div>
				<Menu />
			</div>
			<div className='flex gap-3 p-5'>
				<Button
					icon='pi pi-plus'
					onClick={() => {
						navigate('add')
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

			<div className='flex gap-3 p-5'>{displayLocations()}</div>
		</div>
	);
};
