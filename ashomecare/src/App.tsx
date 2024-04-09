/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import { loadModules } from "./inversify/config";
import { LocationModule } from "./portal/locations/manager/LocationModule";
import { UserModule } from "./portal/user/manager/UserModule";
import { GeneratorModule } from "./portal/utilities/generateId/GeneratorModule";
import { NotificationModule } from "./portal/utilities/notification/NotificationModule";
import { Routes } from "./Routes";

// Bind modules
loadModules(
	LocationModule,
	UserModule,
	GeneratorModule,
	NotificationModule
);

export default function App() {
	return (
		<div className='w-full'>
			<Routes />
		</div>
	);
}