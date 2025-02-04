import {Box, Button, Card, Link, Zoom} from "@mui/material";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import ValidatedUsernameTextField from "../components/InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../components/InputElements/TextField/ValidatedPasswordField.jsx";
import AnimatedElement from "../components/InputElements/AnimatedElement.jsx";
import {useNavigate} from "react-router-dom";
import ValidatedAvatarInput from "../components/InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedPasswordConfirmField from "../components/InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import {CircularLoading} from "../components/Loading/CircularLoading/CircularLoading.jsx";
import {useNotification} from "../context/Notification/NotificationProvider.jsx";
import {sendRegistrationForm} from "../services/fetch/unauth/SendRegistrationForm.js";
import ConflictException from "../exception/ConflictException.jsx";


export const SignUp = () => {
    const [avatarUrl, setAvatarUrl] = useState('');

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [registrationLoading, setRegistrationLoading] = useState(false);
    const navigate = useNavigate();

    const { showError, showWarn, showSuccess} = useNotification();
    const handleSubmit = async () => {
        if (usernameError || passwordError || confirmPasswordError) {
            return;
        }

        const requestData = {
            username,
            password,
            avatarUrl
        };

        try {
            setRegistrationLoading(true);
            await sendRegistrationForm(requestData);

            navigate("/cloud-storage/login");

            showSuccess("You've successfully signed up. Now you can log in to your account.");

        } catch (error) {
            console.log(error);
            switch (true) {
                case error instanceof ConflictException:
                    showWarn(error.message);
                    setUsernameError(error.message);
                    break;

                // case error instanceof UserAlreadyExistException:
                //     setUsernameError(error.message);
                //     break;

                default:
                    showError("Failed to sign up! Try again please.");
                    console.log('Unknown error occurred! ');
                // window.location.reload();
            }
        }
        setRegistrationLoading(false);
    };

    const [avatarLoading, setAvatarLoading] = useState(false);

    const shouldShowPasswordField = !usernameError && username.length > 0;
    const shouldShowValidatePasswordField = !passwordError && shouldShowPasswordField && password.length > 0;
    const shouldShowButton = shouldShowValidatePasswordField && !confirmPasswordError && confirmPassword.length > 0;
    return (
        <Card variant="outlined"
              sx={{
                  padding: 4,
                  paddingTop: 3,
                  paddingBottom: 2,
                  boxShadow: 3,
                  position: 'fixed',
                  top: '18%',
                  backgroundColor: 'searchInput',
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  borderRadius: 2,
                  width: {
                      xs: '85%',
                      sm: '400px'
                  },
                  margin: 'auto',
                  height: shouldShowButton ? '500px' : shouldShowValidatePasswordField ? '480px' : shouldShowPasswordField ? '450px' : '350px',
                  transition: 'height 0.5s ease',
                  marginBottom: '200px',

              }}>

            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center'}}
            >
                Sign up
            </Typography>
            <form onSubmit={handleSubmit}>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,

                    }}
                >
                    <ValidatedAvatarInput
                        setAvatarUrl={setAvatarUrl}
                        avatarLoading={avatarLoading}
                        setAvatarLoading={setAvatarLoading}
                    />

                    <ValidatedUsernameTextField
                        username={username}
                        setUsername={setUsername}

                        usernameError={usernameError}
                        setUsernameError={setUsernameError}
                    />

                    <AnimatedElement
                        condition={shouldShowPasswordField}>
                        <ValidatedPasswordField
                            password={password}
                            setPassword={setPassword}

                            passwordError={passwordError}
                            setPasswordError={setPasswordError}
                        />
                    </AnimatedElement>

                    <AnimatedElement
                        condition={shouldShowValidatePasswordField}>
                        <ValidatedPasswordConfirmField
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}

                            confirmPasswordError={confirmPasswordError}
                            setConfirmPasswordError={setConfirmPasswordError}

                            originalPassword={password}
                        />
                    </AnimatedElement>

                    <AnimatedElement
                        condition={shouldShowButton}>
                        <div>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleSubmit()
                                }}
                                loading={registrationLoading || avatarLoading}
                                loadingPosition="center"
                            >
                                Sign up
                            </Button>
                        </div>
                    </AnimatedElement>


                    <Zoom
                        in={!shouldShowButton}
                        timeout={300}
                    >
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                position: 'absolute',
                                left: 0,
                                width: '100%',
                                bottom: 10,
                                textAlign: 'center'
                            }}

                        >
                            Already have an account?{' '}
                            <Link
                                onClick={() => navigate("/cloud-storage/login")}
                                sx={{color: '#1976d2', cursor: 'pointer'}}>
                                Sign in
                            </Link>
                        </Typography>
                    </Zoom>
                </Box>
            </form>

        </Card>
    )
}

