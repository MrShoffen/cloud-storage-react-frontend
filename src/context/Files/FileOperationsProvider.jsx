import React, {createContext, useContext, useEffect, useState} from "react";
import {sendGetFolderContent} from "../../services/fetch/auth/storage/SendGetFolderContent.js";
import {sendDeleteObject} from "../../services/fetch/auth/storage/SendDeleteObject.js";
import {useStorageNavigation} from "../Storage/StorageNavigationProvider.jsx";
import {sendMoveObject} from "../../services/fetch/auth/storage/SendMoveObject.js";
import {extractSimpleName} from "../../services/util/Utils.js";
import ConflictException from "../../exception/ConflictException.jsx";
import {useStorageSelection} from "../Storage/StorageSelectionProvider.jsx";
import {sendCopyObject} from "../../services/fetch/auth/storage/SendCopyObjects.js";
import {nanoid} from 'nanoid';
import {API_DOWNLOAD_FILES} from "../../UrlConstants.jsx";

const FileOperationsContext = createContext();

export const useStorageOperations = () => useContext(FileOperationsContext);


export const FileOperationsProvider = ({children}) => {

    const {loadFolder, currentPath} = useStorageNavigation();
    const {isCopyMode, isCutMode, bufferIds, endCopying, endCutting} = useStorageSelection();

    const [tasks, setTasks] = useState([]);
    const [newTasksAdded, setNewTasksAdded] = useState(false);


    const createTask = (objectPath, target, type, message) => {
        const operation = {type: type, source: objectPath, target: target};
        return {id: nanoid(), operation: operation, status: "pending", message: message};
    }


    const identicalTasks = (task1) => {
        const pendingTasks = tasks.filter((task) => task.status === "pending");
        let filtered = pendingTasks.filter((task) => task.operation.source === task1.operation.source);
        return filtered.length > 0;
    }

    const deleteTask = (task) => {
        setTasks(prevTasks =>
            prevTasks.filter((inTask) => inTask.id !== task.id));
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
                inTask.id === task.id
                    ? {
                        ...inTask, status: newStatus ? newStatus : inTask.status,
                        message: newMessage ? newMessage : inTask.message
                    }
                    : inTask
            )
        )
    }


    const deleteObject = (objects) => {
        let deleteTasks = objects.map(path => createTask(path, null, "delete", "В очереди на удаление"));
        let uniqueTasks = deleteTasks.filter((task) => !identicalTasks(task));

        setTasks([...tasks, ...uniqueTasks]);
        setNewTasksAdded(true);
        executeTasks(uniqueTasks);
    }

    const moveObjects = (sourceObjects, target) => {
        const moveTasks = sourceObjects.map(source => createTask(source, target + extractSimpleName(source), "move", "В очереди для перемещения"));
        let uniqueTasks = moveTasks.filter((task) => !identicalTasks(task));

        setTasks([...tasks, ...uniqueTasks]);
        setNewTasksAdded(true);
        executeTasks(uniqueTasks);
    }

    const copyObjects = (sourceObjects, target) => {
        const copyTasks = sourceObjects.map(source => createTask(source, target + extractSimpleName(source), "copy", "В очереди для копирования"));
        let uniqueTasks = copyTasks.filter((task) => !identicalTasks(task));

        setTasks([...tasks, ...uniqueTasks]);
        setNewTasksAdded(true);
        executeTasks(uniqueTasks);
    }

    const downloadObjects = (objectPath) => {
        const task = createTask(objectPath, null, "download", "В очереди на скачивание");
        if (identicalTasks(task)) {
            return;
        }

        const downloadTask = {...task, progress: 0};

        setTasks([...tasks, downloadTask]);
        setNewTasksAdded(true);
        //todo start execution right in task with useEffect()

        executeDownloadTask(downloadTask);
    }

    const updateDownloadTask = (task, progress) => {
        setTasks(prevTasks =>
            prevTasks.map(inTask =>
                inTask.id === task.id
                    ? {
                        ...inTask, progress: progress
                    }
                    : inTask
            )
        )
    }

    const executeDownloadTask = async (downloadTask) => {
        updateTask(downloadTask, "progress", "Скачиваем...")

        const filePath = downloadTask.operation.source;

        const params = new URLSearchParams({object: filePath});

        const fetchUrl = `${API_DOWNLOAD_FILES}?${params.toString()}`;

        //todo move to service
        try {
            const response = await fetch(fetchUrl, {
                method: 'GET',
                credentials: 'include',
            });
            console.log(response);

            if (!response.ok) {
                updateTask(downloadTask,"error", "Ошибка при скачивании. Попробуйте еще раз")
                return;
            }

            const contentLength = response.headers.get('Content-Length');
            const totalSize = contentLength ? parseInt(contentLength, 10) : null;

            let loadedSize = 0;
            const reader = response.body.getReader();
            const chunks = [];


            let count = 0;
            while (true) {
                count++;
                const {done, value} = await reader.read();
                if (done) break;

                chunks.push(value);
                loadedSize += value.length;

                if (totalSize && count === 100) {
                    count = 0;
                    const progress = (loadedSize / totalSize) * 100;
                    console.log(`Download progress: ${progress.toFixed(2)}%`);
                    updateDownloadTask(downloadTask, progress);
                }
            }

            const blob = new Blob(chunks);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', extractSimpleName(filePath));
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            updateTask(downloadTask,"error", "Ошибка при скачивании. Попробуйте еще раз")

        }

        updateTask(downloadTask,"completed", "Скачивание завершено")
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
            if (task.operation.type === "copy") {
                await executeCopyTask(task);
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
            updateTask(task, "progress", "Перемещаем...")
            await sendMoveObject(task.operation.source, task.operation.target);
            updateTask(task, "completed", "Перемещение успешно выполнено")

        } catch (e) {
            updateTask(task, "error", e.message);
        }

    }

    async function executeCopyTask(task) {
        try {
            updateTask(task, "progress", "Копируем...")
            await sendCopyObject(task.operation.source, task.operation.target);
            updateTask(task, "completed", "Копирование успешно выполнено")

        } catch (e) {
            updateTask(task, "error", e.message);
        }

    }


    const executeDeleteTask = async (task) => {
        try {
            updateTask(task, "progress", "Удаляем...");
            await sendDeleteObject(task.operation.source);
            updateTask(task, "completed", "Удаление успешно выполнено")

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
        if (isCopyMode) {
            console.log(bufferIds);
            copyObjects(bufferIds, currentPath);
            endCopying();
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
            copyObjects,
            pasteObjects,
            downloadObjects
        }}>
        {children}
    </FileOperationsContext.Provider>);
}