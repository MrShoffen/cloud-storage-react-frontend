import {API_FILES, API_FILES_LIST} from "../../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../../exception/ThrowSpecifyException.jsx";


export const sendGetObjectStats = async (object = "") => {


    const params = new URLSearchParams({object: object});

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