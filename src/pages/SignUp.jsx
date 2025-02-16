import {Box, Button, Card, Divider, Link, ToggleButton, ToggleButtonGroup, Zoom} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import ValidatedUsernameTextField from "../components/InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../components/InputElements/TextField/ValidatedPasswordField.jsx";
import AnimatedElement from "../components/InputElements/AnimatedElement.jsx";
import {useNavigate} from "react-router-dom";
import ValidatedAvatarInput from "../components/InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedPasswordConfirmField from "../components/InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import {useNotification} from "../context/Notification/NotificationProvider.jsx";
import {sendRegistrationForm} from "../services/fetch/unauth/SendRegistrationForm.js";
import ConflictException from "../exception/ConflictException.jsx";


export const SignUp = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarLoading, setAvatarLoading] = useState(false);

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [registrationLoading, setRegistrationLoading] = useState(false);

    const navigate = useNavigate();
    const {showError, showWarn, showSuccess} = useNotification();

    const handleSubmit = async () => {
        if (usernameError || passwordError || confirmPasswordError) {
            return;
        }

        const requestData = {username, password, avatarUrl, storagePlan};

        try {
            setRegistrationLoading(true);
            await sendRegistrationForm(requestData);
            navigate("/cloud-storage/login");
            showSuccess("Регистрация успешно выполнена", 5000);
        } catch (error) {
            switch (true) {
                case error instanceof ConflictException:
                    showWarn(error.message);
                    setUsernameError(error.message);
                    break;
                default:
                    showError("Не удалось зарегистрироваться. Попробуйте позже");
                    console.log('Unknown error occurred! ');
            }
        }
        setRegistrationLoading(false);
    };


    const shouldShowPasswordField = !usernameError && username.length > 0;
    const shouldShowValidatePasswordField = !passwordError && shouldShowPasswordField && password.length > 0;
    const shouldShowButton = shouldShowValidatePasswordField && !confirmPasswordError && confirmPassword.length > 0;

    const [storagePlan, setstoragePlan] = useState("BASIC");
    const handleChange = (event, newPlan) => {
        setstoragePlan(newPlan);
    };

    return (
        <Card variant="outlined"
              sx={{
                  padding: 3,
                  boxShadow: 3,
                  position: 'fixed',
                  top: '15%',
                  backgroundColor: 'searchInput',
                  alignSelf: 'center',
                  borderRadius: 2,
                  width: {xs: '85%', sm: '400px'},
                  height: shouldShowButton ? '540px' : shouldShowValidatePasswordField ? '480px' : shouldShowPasswordField ? '425px' : '370px',
                  transition: 'height 0.5s ease',
              }}>

            <Typography component="h1" variant="h4" sx={{
                marginTop: shouldShowButton ? -8 : 0,
                textAlign: 'center',
                transition: 'margin 0.3s ease',
            }}>
                Регистрация
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2,}}>

                    <ValidatedAvatarInput
                        setAvatarUrl={setAvatarUrl}
                        avatarLoading={avatarLoading}
                        setAvatarLoading={setAvatarLoading}
                    />

                    <Divider sx={{mt: -0.8, mb: 1}}/>

                    <ValidatedUsernameTextField
                        username={username}
                        setUsername={setUsername}
                        usernameError={usernameError}
                        setUsernameError={setUsernameError}
                    />

                    <AnimatedElement condition={shouldShowPasswordField}>
                        <ValidatedPasswordField
                            password={password}
                            setPassword={setPassword}
                            passwordError={passwordError}
                            setPasswordError={setPasswordError}
                        />
                    </AnimatedElement>

                    <AnimatedElement condition={shouldShowValidatePasswordField}>
                        <ValidatedPasswordConfirmField
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            confirmPasswordError={confirmPasswordError}
                            setConfirmPasswordError={setConfirmPasswordError}
                            originalPassword={password}
                        />
                    </AnimatedElement>

                    <AnimatedElement condition={shouldShowButton}>
                        <ToggleButtonGroup
                            color="primary"
                            value={storagePlan}
                            exclusive
                            onChange={handleChange}
                            sx={{
                                alignItems: 'center',
                                width: '100%',
                                borderRadius: 2,
                                mb: 2,
                                mt: -1
                            }}
                        >
                            <ToggleButton sx={{width: '34%', borderRadius: 3}} value="BASIC">Basic</ToggleButton>
                            <ToggleButton sx={{width: '34%'}}  value="STANDARD">Standard</ToggleButton>
                            <ToggleButton sx={{width: '34%', borderRadius: 3}}  value="PRO">Pro</ToggleButton>
                        </ToggleButtonGroup>
                        <Typography sx={{textAlign: 'center', color: 'text.secondary', mt: -1, mb: 1}}>
                            {storagePlan === 'BASIC' ?
                                'Базовый план, на котором доступен 1 Гб облачного хранилища'
                                : (storagePlan === 'STANDARD'
                                    ? 'Стандартный план с 2 Гб облачного хранилища'
                                    : 'Продвинутый план с 4 Гб облачного хранилища' )}
                        </Typography>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            loading={registrationLoading || avatarLoading}
                            loadingPosition="center"
                        >
                            Зарегистрироваться
                        </Button>
                    </AnimatedElement>


                    <Zoom in={!shouldShowButton} timeout={300}>
                        <Typography variant="body1" component="p"
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        width: '100%',
                                        bottom: 10,
                                        textAlign: 'center'
                                    }}>
                            Уже зарегистрированы?{' '}
                            <Link sx={{color: '#1976d2', cursor: 'pointer'}}
                                  onClick={() => navigate("/cloud-storage/login")}>
                                Войти
                            </Link>
                        </Typography>
                    </Zoom>
                </Box>
            </form>

        </Card>
    )
}

