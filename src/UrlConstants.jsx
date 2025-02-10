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

export const API_FILES = API_BASE_URL + API_CONTEXT + '/files';

export const API_FIND_LOCATIONS_UNAUTH = API_BASE_URL + API_CONTEXT + '/locations';
export const API_GET_WEATHER_INFO_UNAUTH = API_BASE_URL + API_CONTEXT + '/weather';
//auth

export const API_USER_INFO = API_BASE_URL + API_CONTEXT + '/users/me';
export const API_LOCATIONS_INFO = API_USER_INFO + '/locations';
export const API_SAVED_LOCATIONS_WEATHER = API_LOCATIONS_INFO + '/weather';


//autofill cities api and image upload api

export const AUTOFILL_CITY_API = isProduction ? "/cities-autofill-api" : "http://192.168.0.190:8081/cities-autofill-api";
export const API_IMAGE_UPLOAD = isProduction ? '/image-upload-api' : 'http://192.168.0.190:8081/image-upload-api';
