import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface IResidenceContext {
    residenceId: string;
    setResidenceId: Dispatch<SetStateAction<string>>;
    isSettings?: boolean;
    setIsSettings?: Dispatch<SetStateAction<boolean>>;
}

export const ResidenceContext = createContext<IResidenceContext>(null);

export const useResidenceContext = (): IResidenceContext => {
    return useContext(ResidenceContext);
}