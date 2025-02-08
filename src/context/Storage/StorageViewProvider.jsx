import React, {createContext, useContext, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/SendGetFolderContent.js";
import {useStorageSelection} from "./StorageSelectionProvider.jsx";


const CloudStorageContext = createContext();

export const useStorageView = () => useContext(CloudStorageContext);


export const StorageViewProvider = ({children}) => {
    const {setSelectedIds, setSelectionMode} = useStorageSelection();

    const [filesView, setFilesView] = useState(() => {
        const view = localStorage.getItem('filesView');
        return view ? view : 'regularTiles';
    });

    const toggleFilesView = (mode) => {
        setSelectionMode(false);
        setSelectedIds([]);

        setFilesView(() => {
            localStorage.setItem('filesView', mode);
            return mode;
        })
    };

    const turnRegularTiles = () => toggleFilesView('regularTiles');
    const turnLargeTiles = () => toggleFilesView('largeTiles');
    const turnList = () => toggleFilesView('list');

    return (<CloudStorageContext.Provider
        value={{
            filesView,
            turnLargeTiles,
            turnRegularTiles,
            turnList
        }}>
        {children}
    </CloudStorageContext.Provider>);
}