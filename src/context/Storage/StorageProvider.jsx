import React, {createContext, useContext, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/SendGetFolderContent.js";


const CloudStorageContext = createContext();

export const useStorageContext = () => useContext(CloudStorageContext);


export const CloudStorageProvider = ({children}) => {
    const [folderLoading, setFolderLoading] = useState(false);
    const [folderPath, setFolderPath] = React.useState([""]);
    const currentFolder = folderPath[folderPath.length - 1];
    const isRootFolder = currentFolder === "";
    const goToPrevFolder = () => {
        setFolderLoading(true);
        if (folderPath.length === 1) {
            return;
        }
        const updatedPath = folderPath.slice(0, -1);
        setFolderPath(updatedPath);
        updateCurrentFolderContent(updatedPath);
        setFolderLoading(false);
    }
    const goToFolder = (folderName) => {
        setFolderLoading(true);
        const updatedPath = [...folderPath, folderName];
        setFolderPath(updatedPath);
        updateCurrentFolderContent(updatedPath);
        setFolderLoading(false);
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

    const initialFolderLoad = async (url = "") => {
        setFolderLoading(true);
        let content = await sendGetFolderContent(url);
        setFolderContent(content);
        console.log(content);


        if (url === "") {
            setFolderLoading(false);

            return;
        }
        const parts = url.split("/").filter(Boolean); // Убираем пустые элементы
        const result = parts.map(part => `${part}/`);

        setFolderPath(["", ...result]);
        setFolderLoading(false);
    }


    return (<CloudStorageContext.Provider
        value={{
            folderLoading,
            folderContent,
            folderPath,
            isRootFolder,
            goToPrevFolder,
            goToFolder,
            initialFolderLoad
        }}>
        {children}
    </CloudStorageContext.Provider>);
}