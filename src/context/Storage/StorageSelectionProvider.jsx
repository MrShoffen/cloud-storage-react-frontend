import React, {createContext, useContext, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/storage/SendGetFolderContent.js";


const CloudStorageContext = createContext();

export const useStorageSelection = () => useContext(CloudStorageContext);


export const StorageSelectionProvider = ({children}) => {
    const [isSelectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const [isCopyMode, setCopyMode] = useState(false);

    const [copyingIds, setCopyingIds] = useState([]);


    const startCopying = () => {
        setCopyingIds(selectedIds);
        setCopyMode(true);

        setSelectedIds([]);
        setSelectionMode(false);
    }

    const endCopying = () => {
        setCopyingIds([]);
        setCopyMode(true);
    }

    return (<CloudStorageContext.Provider
        value={{
            isSelectionMode,
            setSelectionMode,
            selectedIds,
            setSelectedIds,

            isCopyMode,
            copyingIds,
            startCopying,
            endCopying
        }}>
        {children}
    </CloudStorageContext.Provider>);
}