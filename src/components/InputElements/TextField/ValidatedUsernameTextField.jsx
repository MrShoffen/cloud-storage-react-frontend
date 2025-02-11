import ValidatedTextField from "./ValidatedTextField.jsx";
import * as React from "react";
import {useEffect} from "react";


export default function ValidatedUsernameTextField({username, setUsername, usernameError, setUsernameError, label='Имя пользователя'}) {

    const validateUsername = (value) => {
        let isValid = true;
        let errMessage = '';

        if (value && value.length < 5) {
            errMessage = 'Имя пользователя должно быть длинее 4 символов. ';
            isValid = false;
        }
        if (value && !/^[a-zA-Z0-9]+[a-zA-Z_0-9]*[a-zA-Z0-9]+$/.test(value)) {
            errMessage += 'Только латинские буквы, цифры и нижнее подчеркивание. ';
            isValid = false;
        }
        if (value && value.length > 20) {
            errMessage += 'Имя пользователя должно быть короче 20 символов. ';
            isValid = false;
        }

        if (isValid) {
            setUsernameError('');
        } else {
            setUsernameError(errMessage);
        }
        setUsername(value);
    }

    useEffect(() => {
        validateUsername(username);
    }, [username])

    return (

        <ValidatedTextField
            id="username"
            label={label}
            placeholder="Латинские буквы и цифры "
            type="text"

            value={username}
            onChange={(e) => validateUsername(e.target.value)}
            error={usernameError}
            helperText={usernameError}
        />
    )
}