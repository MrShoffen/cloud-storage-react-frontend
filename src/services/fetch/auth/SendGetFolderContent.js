import {API_FOLDER_CONTENT, API_GET_WEATHER_INFO_UNAUTH, API_LOCATIONS_INFO} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendGetFolderContent = async (folderName = "") => {
    const params = new URLSearchParams({"folder-name": folderName});

    let url;
    if (folderName === "") {
        url = API_FOLDER_CONTENT
    } else {
        url = `${API_FOLDER_CONTENT}?${params.toString()}`;
    }

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