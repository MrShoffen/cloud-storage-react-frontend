import UnauthorizedException from "./UnauthorizedException.jsx";
import IncorrectPasswordException from "./IncorrectPasswordException.jsx";
import ConflictException from "./ConflictException.jsx";
import SessionNotFoundException from "./SessionNotFoundException.jsx";
import WeatherApiException from "./WeatherApiException.jsx";
import LocationAlreadySavedException from "./LocationAlreadySavedException.jsx";


export const throwSpecifyException = (error) => {

    switch (error.status) {
        case 401:
            throw new UnauthorizedException(error.detail);
        case 409:
            throw new ConflictException(error.detail);
        default:
            throw new Error('Unknown error');
    }

}