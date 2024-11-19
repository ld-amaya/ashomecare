/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Divider } from "primereact/divider";

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
