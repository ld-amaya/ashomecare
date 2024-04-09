/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { ContainerModule } from "inversify";
import { container } from "../../../inversify/config";
import { NotificationManager } from "./NotificationManager";

export const NotificationModule = new ContainerModule((bind) => {
    console.info("*** Binding Notifications");
    bind(NotificationManager).toSelf().inSingletonScope();
})

export const useNotificationManager = () => {
    return container.get(NotificationManager) || new NotificationManager();
}