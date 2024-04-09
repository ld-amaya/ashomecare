/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { BehaviorSubject } from "rxjs";
import { Toast, ToastMessage } from "primereact/toast";
import { injectable } from "inversify";

@injectable()
export class ToastManager {
    toasts: BehaviorSubject<ToastMessage> = new BehaviorSubject<ToastMessage>(null);

    showToast(toast: ToastMessage) {
        if (!toast) return;
        return this.toasts?.next(toast);
    } 
    
}