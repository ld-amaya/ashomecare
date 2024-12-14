/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { useEffect, useState } from "react";

import { Address } from "../../../models/Address";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";

import { ResidenceDetails } from "../models/Residence";
import { useIDGenerator } from "../../utilities/generateId/GeneratorModule";
import { UserDetails, UserInfo } from "../../user/models/User";
import { useResidenceManager } from "../manager/ResidenceModule";
import { useUserManager } from "../../user/manager/UserModule";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotificationManager } from "../../utilities/notification/NotificationModule";
import { ToastMessage } from "primereact/toast";

export const ResidenceEdit = () => {
	const [breadcrumb, setBreadcrumb] = useState<MenuItem[]>([]);
	const [disabled, setDisabled] = useState<boolean>(true);
	const [name, setName] = useState<string>("");

	const [residenceDetails, setResidenceDetails] = useState<ResidenceDetails>(undefined);
	const [address, setAddress] = useState<Address>(undefined);
	const [owner, setOwner] = useState<UserInfo>(undefined);
	const [residenceId, setResidencesId] = useState<string>("");
	const [residenceHeader, setResidenceHeader] = useState<string>('');

	const residenceManager = useResidenceManager();
	const userManager = useUserManager();
	const IdManager = useIDGenerator();
	const navigate = useNavigate();
	const pathManager = useLocation();
	const notificatioNManager = useNotificationManager();

	const home = { icon: "pi pi-building", url: "" };

	useEffect(() => {
		const urlParse: string[] = pathManager.pathname.split("/");
		if (urlParse.some((p) => p === "edit")) {
			setResidencesId(urlParse.pop());
			setResidenceHeader('Edit Residence')
		} else {
			setResidenceHeader('Add Residence');

			const owner: UserInfo = new UserInfo({
				id: IdManager.create("user"),
				firstName: "",
				lastName: "",
				type: "landlord",
			});

			setOwner(owner);
		}
		
		setBreadcrumb([
			{
				label: "residences",
				command: () => navigate(-1),
			},
			{
				label: urlParse.pop(),
			},
		]);
	}, []);

	useEffect(() => {
		getResidenceDetails();
	}, [residenceId]);

	useEffect(() => {
		if (!name || !address || !owner) return;

		setResidenceDetails({
			info: {
				...residenceDetails?.info,
				id: residenceId || IdManager.create("loc"),
				name: name,
				userId: owner.id,
				address: address,
			},
		});

		setDisabled(false);
	}, [name, address, owner]);

	const handleSave = async () => {
		userManager.updateUser({
			info: owner
		});

		const result = await residenceManager.updateResidence(residenceDetails);

		const toast: ToastMessage = result
			? { severity: "success", detail: "Residence successfully saved" }
			: { severity: "warn", detail: "Residence not saved, contact Lou" };

		notificatioNManager.show(toast);
		navigate(-1);
	};

	const handleDelete = async () => {
		const result = await residenceManager.deleteResidence(residenceDetails.info.id);
		const toast: ToastMessage = result
			? { severity: "success", detail: "Residence successfully deleted" }
			: { severity: "warn", detail: "Residence not saved, contact Lou" };

		notificatioNManager.show(toast);
		navigate(-1);
	};

	/**
	 * Get the Residence details based on ResidenceID
	 * @param residenceId
	 */
	const getResidenceDetails = async () => {
		const residenceDetails: ResidenceDetails = await residenceManager.getResidenceDetails(residenceId);
		if (residenceDetails) {
			setName(residenceDetails.info.name);
			setAddress(residenceDetails.info.address);
			getOwner(residenceDetails.info.userId);
		}
	};

	/**
	 * Get the owner details based on ID
	 * @param userId 
	 */
	const getOwner = async (userId: string) => {
		const ownerDetails: UserDetails = await userManager.getUserDetail(userId);
		if (ownerDetails) {
			setOwner(ownerDetails.info);
		} else {
			const owner: UserInfo = new UserInfo({
				id: IdManager.create("user"),
				firstName: "",
				lastName: "",
				type: "landlord",
			});
			
			setOwner(owner)
		}
	};

	const residenceAddress = () => {
		return (
			<div className='mt-5 md:px-5 px-3'>
				<div className='text-lg'>Residence Address</div>
				<Fieldset className='mt-3'>
					<div className='flex md:flex-row flex-column gap-2'>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='address1'>Address 1 </label>
							<InputText
								className='w-full'
								id='address1'
								value={address?.address1 || ""}
								onChange={(e) =>
									setAddress({
										...address,
										address1: e.target.value,
									})
								}
							/>
						</div>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='address2'>Address 2 </label>
							<InputText
								className='w-full'
								id='address2'
								value={address?.address2 || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setAddress({
										...address,
										address2: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className='flex md:flex-row flex-column gap-2 w-full'>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='city'>City</label>
							<InputText
								className='w-full'
								id='city'
								value={address?.city || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setAddress({
										...address,
										city: e.target.value,
									})
								}
							/>
						</div>
						<div className='flex md:flex-row flex-column gap-2 w-full'>
							<div className='flex flex-column w-full gap-2'>
								<label htmlFor='state'>State</label>
								<InputText
									className='w-full'
									id='state'
									value={address?.state || ""}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setAddress({
											...address,
											state: e.target.value,
										})
									}
								/>
							</div>
							<div className='flex flex-column w-full gap-2'>
								<label htmlFor='zip'>Zip</label>
								<InputText
									className='w-full'
									id='zip'
									value={address?.zip || ""}
									onChange={(e) =>
										setAddress({
											...address,
											zip: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>
				</Fieldset>
			</div>
		);
	};

	const OwnerDetails = () => {
		return (
			<div className='mt-5 md:px-5 px-3'>
				<div className='text-lg'>Owner Details</div>
				<Fieldset className='mt-3'>
					<div className='flex md:flex-row flex-column gap-2'>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='firstName'>First Name</label>
							<InputText
								className='w-full'
								id='firstName'
								value={owner?.firstName || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setOwner({
										...owner,
										firstName: e.target.value,
									})
								}
							/>
						</div>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='lastName'>Last Name</label>
							<InputText
								className='w-full'
								id='lastName'
								value={owner?.lastName || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setOwner({
										...owner,
										lastName: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className='flex md:flex-row flex-column gap-2'>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='email'>Email</label>
							<InputText
								className='w-full'
								id='email'
								value={owner?.email || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setOwner({
										...owner,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className='flex flex-column w-full gap-2'>
							<label htmlFor='contact'>Contact Number</label>
							<InputMask
								className='w-full'
								id='contact'
								value={owner?.mobile}
								mask='(999) 999-9999'
								onChange={(e) =>
									setOwner({
										...owner,
										mobile: e.target.value,
									})
								}
							/>
						</div>
					</div>
				</Fieldset>
			</div>
		);
	};

	return (
		<div className='w-full md:p-5 p-2'>
			<BreadCrumb home={home} model={breadcrumb} className='border-0' />
			<Divider />
			<div className='flex align-items-center justify-content-between text-xl gap-3 md:p-5 p-3'>
				<div className='flex gap-2 align-items-center'>
					<Avatar
						icon='pi pi-compass'
						size='large'
						shape='circle'
						style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
					/>
					{residenceHeader}
				</div>
				<div className = 'flex gap-2'>
					<Button
						label='Save'
						onClick={() => {
							handleSave();
						}}
						disabled={disabled}
					/>
					<Button
						label="Delete"
						severity="warning"
						onClick={() => {
							handleDelete()
						}}
					/>
				</div>
			</div>
			<div className='flex flex-column gap-2 mt-5 md:px-5 px-3'>
				<label htmlFor='ResidenceName' className='text-lg'>
					Residence Name
				</label>
				<InputText
					className='w-full'
					id='ResidenceName'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			{residenceAddress()}
			{OwnerDetails()}
		</div>
	);
};
