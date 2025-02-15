const isProduction = import.meta.env.MODE === "production"; // Определяем режим окружения


export const API_BASE_URL = isProduction ? "" :
    "http://192.168.0.190:8080"
    // "http://localhost:8080"
;

export const API_CONTEXT = '/api/v1';

//unauth
export const API_REGISTRATION = API_BASE_URL + API_CONTEXT + '/users';
export const API_LOGIN = API_BASE_URL + API_CONTEXT + '/auth/login';
export const API_LOGOUT = API_BASE_URL + API_CONTEXT + '/auth/logout';

export const API_FILES = API_BASE_URL + API_CONTEXT + '/resources';
export const API_FILES_LIST = API_FILES + '/files';
export const API_MOVE_FILES = API_BASE_URL + API_CONTEXT + '/resources/move';
export const API_COPY_FILES = API_BASE_URL + API_CONTEXT + '/resources/copy';
export const API_DOWNLOAD_FILES  = API_BASE_URL + API_CONTEXT + '/resources/download';
export const API_UPLOAD_FILES  = API_BASE_URL + API_CONTEXT + '/resources/upload';
export const API_FILES_PREVIEW  = API_BASE_URL + API_CONTEXT + '/resources/preview';


export const API_USER_INFO = API_BASE_URL + API_CONTEXT + '/users/me';


//autofill cities api and image upload api

export const API_IMAGE_UPLOAD = isProduction ? '/image-upload-api' : 'http://192.168.0.190:8081/image-upload-api';

export const API_PREVIEW = isProduction ? '/preview/' : 'http://192.168.0.125:9000/user-files/';