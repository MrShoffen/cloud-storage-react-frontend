import React, {createContext, useContext, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/SendGetFolderContent.js";


const CloudStorageContext = createContext();

export const useStorageContext = () => useContext(CloudStorageContext);


export const CloudStorageProvider = ({children}) => {
    const [folderContentLoading, setFolderContentLoading] = useState(false);
    const [folderPath, setFolderPath] = React.useState([""]);
    const currentFolder = folderPath[folderPath.length - 1];
    const isRootFolder = currentFolder === "";
    const goToPrevFolder = () => {
        setFolderContentLoading(true);
        if (folderPath.length === 1) {
            return;
        }
        const updatedPath = folderPath.slice(0, -1);
        setFolderPath(updatedPath);
        updateCurrentFolderContent(updatedPath);
        setFolderContentLoading(false);
    }
    const goToFolder = (folderName) => {
        setFolderContentLoading(true);
        const updatedPath = [...folderPath, folderName];
        setFolderPath(updatedPath);
        updateCurrentFolderContent(updatedPath);
        setFolderContentLoading(false);
    }


    const [folderContent, setFolderContent] = useState(null);
//todo after update - parse url in browser to save state
    const updateCurrentFolderContent = async (path = [""]) => {
        // console.log(path);
        const fullPath = path.join("");
        let content = await sendGetFolderContent(fullPath);
        setFolderContent(content);
        console.log(content);
        window.history.pushState(null, "", '/cloud-storage/home/' + fullPath);

    }

    const loadFolder = async (url = "") => {
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


    return (<CloudStorageContext.Provider
        value={{
            folderContentLoading,
            folderContent,
            folderPath,
            isRootFolder,
            goToPrevFolder,
            goToFolder,
            loadFolder
        }}>
        {children}
    </CloudStorageContext.Provider>);
}