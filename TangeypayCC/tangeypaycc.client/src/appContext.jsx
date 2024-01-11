import React, { useReducer, useContext } from "react";
import appReducer from "./reducers/appReducer";

const AppDataContext = React.createContext(null);
export function AppDataProvider(props) {
    const [info, infoDispatch] = useReducer(appReducer, null);
    const [infoFetch, infoFetchDispatch] = useReducer(appReducer, null);
    const [isFetched, isFetchedDispatch] = useReducer(appReducer, false);
    const [isPosted, isPostedDispatch] = useReducer(appReducer, false);

    const contextValue = {
        info,
        infoFetch,
        isFetched,
        isPosted,
        infoDispatch,
        infoFetchDispatch,
        isFetchedDispatch,
        isPostedDispatch
    };

    return <AppDataContext.Provider value={contextValue}>
        {props.children}
    </AppDataContext.Provider>
}

export function useAppData() {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error("useAppData must be used within a AppDataProvider. Wrap a parent in <AppDataProvider> to fix this error");
    }
    return context;
}