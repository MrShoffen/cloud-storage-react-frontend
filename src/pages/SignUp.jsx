import {Box, Button, Card, Divider, Link, Zoom} from "@mui/material";
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

        const requestData = {username, password, avatarUrl};

        try {
            setRegistrationLoading(true);
            await sendRegistrationForm(requestData);
            navigate("/cloud-storage/login");
            showSuccess("You've successfully signed up. Now you can log in to your account.", 5000);
        } catch (error) {
            switch (true) {
                case error instanceof ConflictException:
                    showWarn(error.message);
                    setUsernameError(error.message);
                    break;
                default:
                    showError("Failed to sign up! Try again please.");
                    console.log('Unknown error occurred! ');
            }
        }
        setRegistrationLoading(false);
    };


    const shouldShowPasswordField = !usernameError && username.length > 0;
    const shouldShowValidatePasswordField = !passwordError && shouldShowPasswordField && password.length > 0;
    const shouldShowButton = shouldShowValidatePasswordField && !confirmPasswordError && confirmPassword.length > 0;
    return (
        <Card variant="outlined"
              sx={{
                  padding: 3,
                  boxShadow: 3,
                  position: 'fixed',
                  top: '18%',
                  backgroundColor: 'searchInput',
                  alignSelf: 'center',
                  borderRadius: 2,
                  width: {xs: '85%', sm: '400px'},
                  height: shouldShowButton ? '500px' : shouldShowValidatePasswordField ? '480px' : shouldShowPasswordField ? '425px' : '340px',
                  transition: 'height 0.5s ease',
              }}>

            <Typography component="h1" variant="h4" sx={{textAlign: 'center'}}>
                Sign up
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
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            loading={registrationLoading || avatarLoading}
                            loadingPosition="center"
                        >
                            Sign up
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
                            Already have an account?{' '}
                            <Link sx={{color: '#1976d2', cursor: 'pointer'}}
                                  onClick={() => navigate("/cloud-storage/login")}>
                                Sign in
                            </Link>
                        </Typography>
                    </Zoom>
                </Box>
            </form>

        </Card>
    )
}

