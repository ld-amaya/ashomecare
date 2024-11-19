/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import { loadModules } from "./inversify/config";
import { ResidenceModule } from "./portal/residences/manager/ResidenceModule";
import { UserModule } from "./portal/user/manager/UserModule";
import { GeneratorModule } from "./portal/utilities/generateId/GeneratorModule";
import { NotificationModule } from "./portal/utilities/notification/NotificationModule";
import { Routes } from "./Routes";
import { OrganizationModule } from "./portal/organizations/manager/OrganizationModule";

// Bind modules
loadModules(
	ResidenceModule,
	UserModule,
	GeneratorModule,
	NotificationModule,
	OrganizationModule
);

export default function App() {
	return (
		<div className='w-full'>
			<Routes />
		</div>
	);
}
