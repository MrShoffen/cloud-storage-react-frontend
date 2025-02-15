import axios from "axios";
import {API_UPLOAD_FILES} from "../../../../UrlConstants.jsx";


export async function sendUpload(files, updateDownloadTask, updateTask, uploadTask, currPath) {

    console.log(currPath);
    console.log(files + ' === ' + currPath)
    const formData = new FormData();
    files.forEach(({file, path}) => {
        formData.append("object", file, path);
    })
    formData.append("path", currPath);


    let shouldReadProgress = true;

    try {
        const response = await axios.post(API_UPLOAD_FILES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.progress === 1) {
                    updateTask(uploadTask, "progress", "Сохраняем в хранилище...")
                }

                updateDownloadTask(uploadTask, progressEvent.progress * 100);
            },
        });

        let resp = response.data[0];

        if (resp.status !== 201) {
            updateTask(uploadTask, "error", resp.detail);

        } else {
            updateTask(uploadTask, "completed", "Загружено");
        }
    } catch (error) {
        console.log(error);
        updateTask(uploadTask, "error", "Ошибка при загрузке. Попробуйте позже");
    }


}

export const handleUpload = async (files, currentPath, uploadTask, updateUploadTask, updateTask) => {

    //     const size = files.length;
    //
    //
    // const filesWithoutFolder = [];
    // const innerFolders = {};
    //
    // files.forEach(({file, path}) => {
    //     const fileName = path; // Предполагаем, что file - это объект с полем name
    //     const firstSlash = fileName.indexOf("/");
    //
    //     if (firstSlash === -1) {
    //         filesWithoutFolder.push({file, path});
    //     } else {
    //         const prefix = fileName.substring(0, firstSlash + 1);
    //         if (!innerFolders[prefix]) {
    //             innerFolders[prefix] = [];
    //         }
    //         innerFolders[prefix].push({file, path});
    //     }
    // });
    //
    // const firstForm = new FormData();
    // filesWithoutFolder.forEach(({file, path}) => {
    //     firstForm.append("object", file, path);
    // })
    // firstForm.append("folder",  currentPath);
    // await fetchData(firstForm, updateUploadTask, uploadTask);
    //
    //
    // for (const prefix of Object.keys(innerFolders)) {
    //
    //     const filesInFolder = innerFolders[prefix];
    //
    //     const form = new FormData();
    //     filesInFolder.forEach(({file, path}) => {
    //         form.append("object", file,  path);
    //     })
    //
    //     form.append("folder", currentPath);
    //     await fetchData(form, updateUploadTask, uploadTask);
    // }
    //
    // console.log(filesWithoutFolder);
    // console.log(innerFolders);


};