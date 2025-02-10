import React, {createContext, useContext, useEffect, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/storage/SendGetFolderContent.js";
import {sendDeleteObject} from "../../services/fetch/auth/storage/SendDeleteObject.js";
import {useStorageNavigation} from "../Storage/StorageNavigationProvider.jsx";

const FileOperationsContext = createContext();

export const useStorageOperations = () => useContext(FileOperationsContext);


export const FileOperationsProvider = ({children}) => {

    const {loadFolder, removeObjectFromFolderContent} = useStorageNavigation();
    const loadFolderFromPath = () => {
        let extracted = location.pathname.replace(/^\/cloud-storage\/home/, '');
        extracted = extracted.replace('/', '');
        let decodedUrl = decodeURIComponent(extracted);
        loadFolder(decodedUrl);
    };

    const [tasks, setTasks] = useState([]);
    const [newTasksAdded, setNewTasksAdded] = useState(false);


    const createTask = (objectPath, type) => {
        const operation = {type: type, source: objectPath, target: null};
        return {id: tasks.length + 1, operation: operation, status: "pending"};
    }

    const identicalTasks = (task1) => {
        const pendingTasks = tasks.filter((task) => task.status === "pending");
        let filtered = pendingTasks.filter((task) => task.operation.source === task1.operation.source);
        return filtered.length > 0;
    }

    const deleteTask = (task) => {
        setTasks(prevTasks =>
            prevTasks.filter((inTask) => inTask.operation.source !== task.operation.source));
    }

    const clearTasks = () => {
        setTasks([]);
    }

    const allTasksCompleted = () => {
        let activeTasks = tasks.filter((task) => task.status === "pending" || task.status === "progress");

        return activeTasks.length === 0;
    }





    const deleteObject = (objects) => {
        let deleteTasks = objects.map(path => createTask(path, "delete"));

        let uniqueTasks = deleteTasks.filter((task) => !identicalTasks(task));

        setTasks([...tasks, ...uniqueTasks]);
        setNewTasksAdded(true);
        executeTasks(uniqueTasks);
    }

    const executeTasks = async (pendingTasks) => {
        for (const task of pendingTasks) {
            if (task.operation.type === "delete") {

                setTasks(prevTasks =>
                    prevTasks.map(inTask =>
                        inTask.operation.source === task.operation.source
                            ? {...inTask, status: "progress"}
                            : inTask
                    )
                )
                await executeDeleteTask(task);
            }
        }

        for (const task of pendingTasks) {
            removeObjectFromFolderContent(task.operation.source);

        }

        // loadFolderFromPath();
    }

    const executeDeleteTask = async (task) => {
        try {
            await sendDeleteObject(task.operation.source);

            setTasks(prevTasks =>
                prevTasks.map(inTask =>
                    inTask.operation.source === task.operation.source
                        ? {...inTask, status: "completed"}
                        : inTask
                )
            )

        } catch (e) {

        }
    }


    // useEffect(() => {
    //     const pendingTasks = tasks.filter((task) => task.status === "pending");
    //     console.log(pendingTasks);
    //
    //
    //
    // }, [tasks]);


    return (<FileOperationsContext.Provider
        value={{
            tasks,
            newTasksAdded,
            setNewTasksAdded,
            deleteTask,
            clearTasks,
            allTasksCompleted,

            deleteObject
        }}>
        {children}
    </FileOperationsContext.Provider>);
}