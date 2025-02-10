import {API_FILES, API_GET_WEATHER_INFO_UNAUTH, API_LOCATIONS_INFO} from "../../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../../exception/ThrowSpecifyException.jsx";


export const sendGetFolderContent = async (folderName = "") => {


    const params = new URLSearchParams({object: folderName});

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