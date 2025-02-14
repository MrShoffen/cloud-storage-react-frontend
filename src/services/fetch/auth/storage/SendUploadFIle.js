import axios from "axios";
import {API_UPLOAD_FILES} from "../../../../UrlConstants.jsx";


async function fetchData(formData, uploadTask, updateDownloadTask, index, size) {
    const response = await axios.post(API_UPLOAD_FILES, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
            const percent = progressEvent.loaded / progressEvent.total;
            console.log(percent);
            let delta = (1/size)*100*percent;
            // console.log(delta);
            updateDownloadTask(uploadTask, ((index)/size)*100 + delta);
        },
    });
}

export const handleUpload = async (newFiles, currentPath, uploadTask, updateDownloadTask) => {
    try {


        // newFiles.forEach(({file, path}) => {
        //     const formData = new FormData();
        //
        //     formData.append('object', file, path);
        //     formData.append('folder', currentPath);
        //
        // })
        const size = newFiles.length;

        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i].file;
            const path = newFiles[i].path;

            const formData = new FormData();
            formData.append('object', file, currentPath + path);
            formData.append('folder', "foldPath");

            await fetchData(formData, uploadTask, updateDownloadTask, i, size);
            updateDownloadTask(uploadTask, ((i+1)/size)*100);
        }

        let currentProgress = uploadTask.progress;

        // console.log(tasks);
        //
        // increaseUploadTask(uploadTask,size);
        // console.log('Upload success:', response.data);

    } catch (error) {
        // console.log('Upload failed:', error);
    } finally {

    }
};