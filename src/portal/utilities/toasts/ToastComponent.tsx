import React, { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Severity } from '../../../models/Severity';

interface toastProps {
    severity: Severity;
    message: string;
    life?: number
}

export const ToastComponent = (props: toastProps) => {
    const { severity, message, life } = props
    const toast = useRef<Toast>(null);

    const show = () => {
        toast.current?.show({ severity:  severity as Severity, detail: message, life: life });
    };

    useEffect(() => {
        show();
    }, [])

    return (
        <div className= "card flex justify-content-center" >
            <Toast ref={toast} />
            
        </div>
    )
}