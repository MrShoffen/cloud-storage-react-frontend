import React, {createContext, useContext, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/SendGetFolderContent.js";


const CloudStorageContext = createContext();

export const useStorageSelection = () => useContext(CloudStorageContext);


export const StorageSelectionProvider = ({children}) => {
    const [isSelectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    return (<CloudStorageContext.Provider
        value={{
            isSelectionMode,
            setSelectionMode,
            selectedIds,
            setSelectedIds
        }}>
        {children}
    </CloudStorageContext.Provider>);
}