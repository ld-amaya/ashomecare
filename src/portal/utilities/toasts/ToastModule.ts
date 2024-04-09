import { container } from "../../../inversify/config";
import { ToastManager } from "./ToastManager";

let _toastManager: ToastManager;

container.bind(ToastManager).toSelf().inSingletonScope();

export const useToastManager = () => {
    return container.get('ToastManager') || _toastManager;
}