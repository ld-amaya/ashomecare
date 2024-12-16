import { Outlet } from "react-router-dom";
import { NavBar } from "./portal/navigation/NavBar";
import { SideBar } from "./portal/navigation/SideBar";

export const MainMenu = () => {
    return (
			<div className='flex flex-column'>
				<div>
					<NavBar />
				</div>
				<div className='flex md:flex-row flex-column'>
					<SideBar />
					<Outlet />
				</div>
			</div>
		);
}