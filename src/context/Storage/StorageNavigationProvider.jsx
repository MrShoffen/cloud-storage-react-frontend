import React, {createContext, useContext, useRef, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/storage/SendGetFolderContent.js";
import {useStorageSelection} from "./StorageSelectionProvider.jsx";
import {Box} from "@mui/material";


const CloudStorageContext = createContext();

export const useStorageNavigation = () => useContext(CloudStorageContext);


export const StorageNavigationProvider = ({children}) => {
    const {setSelectedIds} = useStorageSelection();

    const [folderContentLoading, setFolderContentLoading] = useState(false);
    const [folderPath, setFolderPath] = React.useState([""]);
    const currentFolder = folderPath[folderPath.length - 1];
    const isRootFolder = currentFolder === "";
    const currentPath = folderPath.join("");
    const currentPathRef = useRef();

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

    const [folderContent, setFolderContent] = useState([]);

    const createSpoofObject = (object) => {
        setFolderContent([...folderContent, object])
    }


    const getObjectByPath = (path) => {
        return folderContent.find(object => object.path === path);
    }

    const updateCurrentFolderContent = async (path = [""]) => {
        setSelectedIds([]);
        const fullPath = path.join("");
        let content = await sendGetFolderContent(fullPath);
        setFolderContent(content);

        window.history.pushState(null, "", '/files/' + fullPath);
    }

    const loadFolder = async (url = "") => {
        setSelectedIds([]);
        setFolderContentLoading(true);
        let content = await sendGetFolderContent(url);
        setFolderContent(content);

        window.history.pushState(null, "", '/files/' + url);

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

    const [searchedContent, setSearchedContent] = React.useState([]);

    const isSearchMode = searchedContent.length > 0;

    const [searchName, setSearchName] = useState("");

    // const isPasteAllowed = () => {
    //     const folderPathes = folderContent.map(obj => obj.path);
    //     let filtered = bufferIds.filter(path => folderPathes.includes(path));
    //     console.log("filt")
    //
    //     console.log(filtered);
    //     return filtered.length === 0;
    // }

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
            currentPathRef,
            createSpoofObject,

            searchedContent,
            setSearchedContent,
            isSearchMode,
            searchName,
            setSearchName,

            getObjectByPath
        }}>
        {children}
        <Box ref={currentPathRef} sx={{color: 'transparent'}} className={"hiddenPath"}>{currentPath}</Box>
    </CloudStorageContext.Provider>);
}