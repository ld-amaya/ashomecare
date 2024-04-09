/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";


export const Portal = () => {
	
	return (
		<div className='w-full md:p-5 p-2'>
			Dashboard
			<Divider />
			<div className='flex flex-column gap-3'>
				This is portal
				
			</div>
		</div>
	);
};
