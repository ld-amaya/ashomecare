import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface ILocationContext {
    locationId: string;
    setLocationId: Dispatch<SetStateAction<string>>;
    isSettings?: boolean;
    setIsSettings?: Dispatch<SetStateAction<boolean>>;
}

export const LocationContext = createContext<ILocationContext>(null);

export const useLocationContext = (): ILocationContext => {
    return useContext(LocationContext);
}