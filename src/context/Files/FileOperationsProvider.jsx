import React, {createContext, useContext, useEffect, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/storage/SendGetFolderContent.js";
import {sendDeleteObject} from "../../services/fetch/auth/storage/SendDeleteObject.js";
import {useStorageNavigation} from "../Storage/StorageNavigationProvider.jsx";
import {sendMoveObject} from "../../services/fetch/auth/storage/SendMoveObject.js";
import {extractSimpleName} from "../../services/util/Utils.js";
import ConflictException from "../../exception/ConflictException.jsx";
import {useStorageSelection} from "../Storage/StorageSelectionProvider.jsx";

const FileOperationsContext = createContext();

export const useStorageOperations = () => useContext(FileOperationsContext);


export const FileOperationsProvider = ({children}) => {

    const {loadFolder, currentPath} = useStorageNavigation();
    const {isCopyMode, isCutMode, bufferIds, endCopying, endCutting} = useStorageSelection();

    const [tasks, setTasks] = useState([]);
    const [newTasksAdded, setNewTasksAdded] = useState(false);


    const createTask = (objectPath, target, type, message) => {
        const operation = {type: type, source: objectPath, target: target};
        return {id: tasks.length + 1, operation: operation, status: "pending", message: message};
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


    const updateTask = (task, newStatus = null, newMessage = null) => {
        setTasks(prevTasks =>
            prevTasks.map(inTask =>
                inTask.operation.source === task.operation.source
                    ? {
                        ...inTask, status: newStatus ? newStatus : inTask.status,
                        message: newMessage ? newMessage : inTask.message
                    }
                    : inTask
            )
        )
    }


    const deleteObject = (objects) => {
        let deleteTasks = objects.map(path => createTask(path, null, "delete", "Waiting for deletion"));
        let uniqueTasks = deleteTasks.filter((task) => !identicalTasks(task));

        setTasks([...tasks, ...uniqueTasks]);
        setNewTasksAdded(true);
        executeTasks(uniqueTasks);
    }

    const moveObjects = (sourceObjects, target) => {
        const moveTasks = sourceObjects.map(source => createTask(source, target + extractSimpleName(source), "move", "Waiting for moving"));
        let uniqueTasks = moveTasks.filter((task) => !identicalTasks(task));

        setTasks([...tasks, ...uniqueTasks]);
        setNewTasksAdded(true);
        executeTasks(uniqueTasks);
    }

    const [taskRunning, setTaskRunning] = useState(false);

    const executeTasks = async (pendingTasks) => {
        setTaskRunning(true);

        for (const task of pendingTasks) {


            if (task.operation.type === "delete") {
                await executeDeleteTask(task);
            }
            if (task.operation.type === "move") {
                await executeMoveTask(task);
            }
        }

        setTaskRunning(false);
    }

    useEffect(() => {
        if (!taskRunning && tasks.length > 0) {
            loadFolder(currentPath);
        }
    }, [taskRunning])


    async function executeMoveTask(task) {
        try {
            updateTask(task, "progress", "Moving in progress...")
            await sendMoveObject(task.operation.source, task.operation.target);
            updateTask(task, "completed", "Moving successfully completed")

        } catch (e) {
            updateTask(task, "error", e.message);
        }

    }


    const executeDeleteTask = async (task) => {
        try {
            updateTask(task, "progress", "Deletion in progress...");
            await sendDeleteObject(task.operation.source);
            updateTask(task, "completed", "Deletion successfully completed")

        } catch (e) {
            updateTask(task, "error", e.message);
        }
    }


// useEffect(() => {
//     const pendingTasks = tasks.filter((task) => task.status === "pending");
//     console.log(pendingTasks);
//
//
//
// }, [tasks]);


    const pasteObjects = () => {
        if (bufferIds.length === 0) {
            return;
        }

        if (isCutMode) {
            console.log(bufferIds);
            moveObjects(bufferIds, currentPath);

            endCutting();
        }
    }


    return (<FileOperationsContext.Provider
        value={{
            tasks,
            newTasksAdded,
            setNewTasksAdded,
            deleteTask,
            clearTasks,
            allTasksCompleted,

            deleteObject,
            moveObjects,
            pasteObjects,
        }}>
        {children}
    </FileOperationsContext.Provider>);
}