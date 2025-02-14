import {API_FILES} from "../../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../../exception/ThrowSpecifyException.jsx";


export const sendGetFolderContent = async (folderName = "") => {


    const params = new URLSearchParams({folder: folderName});

    const url = `${API_FILES}?${params.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });


    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    return await response.json();

}