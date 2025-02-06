import UnauthorizedException from "./UnauthorizedException.jsx";
import ConflictException from "./ConflictException.jsx";
import ForbiddenException from "./ForbiddenException.jsx";


export const throwSpecifyException = (error) => {

    switch (error.status) {
        case 401:
            throw new UnauthorizedException(error.detail);
        case 409:
            throw new ConflictException(error.detail);
        case 403:
            throw new ForbiddenException(error.detail);
        default:
            throw new Error('Unknown error');
    }

}