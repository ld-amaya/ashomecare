/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { ResidenceInfo } from "./models/Residence";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";
import { useResidenceManager } from "./manager/ResidenceModule";

export const Residence = () => {
	const [search, setSearch] = useState<string>("");
	const [residences, setResidences] = useState<ResidenceInfo[]>([]);
	const [items, setItems] = useState<MenuItem[]>([]);

	const residenceManager = useResidenceManager();

	const navigate = useNavigate();

	const home = { icon: "pi pi-building", url: "" };

	useEffect(() => {
		setItems([
			{
				label: "Residences",
			},
		]);
		const getResidenceInfo = async () => {
			const locInfo: ResidenceInfo[] = await residenceManager.getResidenceList();
			setResidences(locInfo);
		};
		getResidenceInfo();
	}, []);

	const displayResidences = (): JSX.Element => {
		const element = residences?.map((residence, idx) => {
			const address = `${residence.address.address1}, ${residence.address.city}, ${residence.address.state}, ${residence.address.zip}`;
			const header = (
				<div className='flex justify-content-between'>
					<div>{residence.name}</div>
					<div>
						<i
							className='pi pi-pencil cursor-pointer'
							onClick={() => {
								navigate(`../residence/edit/${residence.id}`);
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
							navigate("../residence/add");
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
					{displayResidences()}
				</div>
			</div>
		</div>
	);
};
