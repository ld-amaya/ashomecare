import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface IPathContext {
    isLocationPath: boolean;
    setIsLocationPath: Dispatch<SetStateAction<boolean>>;
}

export const PathContext = createContext<IPathContext>(null)

export const usePathContext = (): IPathContext => {
    return useContext(PathContext)
}