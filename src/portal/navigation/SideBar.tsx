/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { MegaMenu } from "primereact/megamenu";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNotificationManager } from "../utilities/notification/NotificationModule";
import { useLocationContext } from "../locations/LocationContext";
import * as path from "path";

export const SideBar = () => {
	const { locationId } = useLocationContext();
	const [isSettings, setIsSettings] = useState<boolean>(false);
	const [ menuList, setMenuList ] = useState<MenuItem[]>([]);

	const toastRef = useRef<Toast>();

	const navigate = useNavigate();
	const notificationManager = useNotificationManager();
	const pathManager = useLocation();

	useEffect(() => {
		let isMounted = true;

		const urlPaths = pathManager.pathname.split('/')
		setIsSettings(urlPaths.some(path => path === 'settings'));

		const getToast = notificationManager.toast.subscribe((toast) => {
			if (toast && isMounted) {
				toastRef.current.show(toast);
			}
		});

		return () => {
			isMounted = false;
			notificationManager.toast.next(null);
			getToast.unsubscribe();
		};
	}, []);

	useEffect(() => {
		let items: MenuItem[] = []

		if (isSettings) {
			items = [
				{
					label: "Locations",
					icon: "pi pi-building",
					command: () => {
						navigate(`portal/settings/locations`, { relative: "path" });
					},
				},
				{
					label: "Clients",
					icon: "pi pi-users",
					command: () => {
						navigate(`portal/settings/clients`, { relative: "path" });
					},
				},
			];
		} else {
			items = [
				{
					label: "Dashboard",
					icon: "pi pi-chart-line",
					command: () => {
						navigate(`portal`, { relative: "path" });
					},
				},
				{
					label: "Clients",
					icon: "pi pi-users",
					command: () => {
						navigate(`portal/location/${locationId}/clients`, {
							relative: "path",
						});
					},
				},
			];
		}
		setMenuList(items);
	}, [isSettings])

	const items: MenuItem[] = menuList;

	return (
		<div className='flex align-content-start md:w-2 w-full'>
			<Toast ref={(ref) => (toastRef.current = ref)} position='bottom-right' />
			<MegaMenu
				className='md:flex-none flex flex-row md:h-screen h-full w-full align-items-start'
				model={items}
				orientation='vertical'
				breakpoint='960px'
			/>
		</div>
	);
};
