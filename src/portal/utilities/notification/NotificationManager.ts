/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { injectable } from "inversify";
import { BehaviorSubject } from "rxjs";
import { ToastMessage } from "primereact/toast";

@injectable()
export class NotificationManager {
    toast: BehaviorSubject<ToastMessage> = new BehaviorSubject<ToastMessage>(null);

    show(toast:ToastMessage) {
        if (!toast) return
        this.toast.next({
            ...toast,
            severity: toast.severity || 'info'
        })
    }
}