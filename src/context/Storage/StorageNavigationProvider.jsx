import React, {createContext, useContext, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/storage/SendGetFolderContent.js";
import {useStorageSelection} from "./StorageSelectionProvider.jsx";


const CloudStorageContext = createContext();

export const useStorageNavigation = () => useContext(CloudStorageContext);


export const StorageNavigationProvider = ({children}) => {
    const {setSelectedIds, bufferIds} = useStorageSelection();

    const [folderContentLoading, setFolderContentLoading] = useState(false);
    const [folderPath, setFolderPath] = React.useState([""]);
    const currentFolder = folderPath[folderPath.length - 1];
    const isRootFolder = currentFolder === "";
    const currentPath = folderPath.join("");

    const goToPrevFolder = async () => {
        setFolderContentLoading(true);

        if (folderPath.length === 1) {
            return;
        }
        const updatedPath = folderPath.slice(0, -1);
        setFolderPath(updatedPath);
        await updateCurrentFolderContent(updatedPath);
        setFolderContentLoading(false);
    }
    const goToFolder = async (folderName) => {
        setFolderContentLoading(true);

        const updatedPath = [...folderPath, folderName];
        setFolderPath(updatedPath);
        await updateCurrentFolderContent(updatedPath);

        setFolderContentLoading(false)
    }


    const [folderContent, setFolderContent] = useState(null);

    const removeObjectFromFolderContent = (deletingPath) => {
        setFolderContent(content =>
            content.filter(object =>
                object.path !== deletingPath
            )
        )
    }


    const updateCurrentFolderContent = async (path = [""]) => {
        setSelectedIds([]);
        const fullPath = path.join("");
        let content = await sendGetFolderContent(fullPath);
        setFolderContent(content);

        console.log(content);
        window.history.pushState(null, "", '/cloud-storage/home/' + fullPath);
    }

    const loadFolder = async (url = "") => {
        setSelectedIds([]);
        setFolderContentLoading(true);
        let content = await sendGetFolderContent(url);
        setFolderContent(content);
        console.log(content);

        window.history.pushState(null, "", '/cloud-storage/home/' + url);

        if (url === "") {
            setFolderContentLoading(false);
            setFolderPath([""])
            return;
        }
        const parts = url.split("/").filter(Boolean); // Убираем пустые элементы
        const result = parts.map(part => `${part}/`);

        setFolderPath(["", ...result]);
        setFolderContentLoading(false);
    }

    const isPasteAllowed = () => {
        const folderPathes = folderContent.map(obj => obj.path);
        let filtered = bufferIds.filter(path => folderPathes.includes(path));
        console.log("filt")

        console.log(filtered);
        return filtered.length === 0;
    }

    return (<CloudStorageContext.Provider
        value={{
            folderContentLoading,
            folderContent,
            folderPath,
            isRootFolder,
            currentFolder,
            currentPath,
            goToPrevFolder,
            goToFolder,
            loadFolder,

            removeObjectFromFolderContent,
            isPasteAllowed
        }}>
        {children}
    </CloudStorageContext.Provider>);
}