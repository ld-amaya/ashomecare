/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Menu } from "../../navigation/MenuBar";
import { Divider } from "primereact/divider"

export const LocationAdd = () => {

    return (
    <div className='flex flex-column gap-3 px-5'>
        <div>
            <Menu />
        </div>
        <Divider />

        <div className='flex gap-3 p-5'>Addin Location</div>
        </div>
    )
}