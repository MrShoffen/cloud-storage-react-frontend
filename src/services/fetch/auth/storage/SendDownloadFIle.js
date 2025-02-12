import {API_DOWNLOAD_FILES} from "../../../../UrlConstants.jsx";
import {extractSimpleName} from "../../../util/Utils.js";


export const sendDownloadFile = async (filePath) => {


    const params = new URLSearchParams({object: filePath});

    const fetchUrl = `${API_DOWNLOAD_FILES}?${params.toString()}`;

    try {
        const response = await fetch(fetchUrl, {
            method: 'GET',
            credentials: 'include',
        });
        console.log(response);

        if (!response.ok) {
            let newVar = await response.json();
            console.log(newVar);
            throw new Error('File download failed');
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

            if (totalSize && count === 200) {
                count = 0;
                const progress = (loadedSize / totalSize) * 100;
                console.log(`Download progress: ${progress.toFixed(2)}%`);
                // Обновите UI с прогрессом загрузки
            }
        }

        const blob = new Blob(chunks);
        console.log('blob');
        console.log(blob);

        const url = window.URL.createObjectURL(blob);
        console.log('url');
        console.log(url);

        const link = document.createElement('a');
        console.log('link');
        console.log(link);

        link.href = url;
        link.setAttribute('download', extractSimpleName(filePath));
        document.body.appendChild(link);
        link.click();

        // Очистка
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.error('Download error:', error);
        // Обработка ошибки (например, показ уведомления)
    }
};