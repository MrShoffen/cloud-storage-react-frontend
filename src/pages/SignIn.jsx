import {Box, Button, Card, Fade, Link, Slide, Zoom} from "@mui/material";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import ValidatedUsernameTextField from "../components/InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../components/InputElements/TextField/ValidatedPasswordField.jsx";
import AnimatedElement from "../components/InputElements/AnimatedElement.jsx";
import {useNavigate} from "react-router-dom";


export const SignIn = () => {
    // const {login} = useAuthContext();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loading, setloading] = useState(false);

    // const {showNotification, showWarn} = useNotification();


    const handleSubmit = async () => {
        if (usernameError || passwordError) {
            return
        }

        const requestData = {
            username,
            password,
        };

        try {
            setloading(true);
            // const profile = await sendLoginForm(requestData);
            // login(profile);
            // showNotification({ message: "You've successfully logged in", severity: "info", duration: 2000 });
        } catch (error) {
            switch (true) {
                // case error instanceof UserNotFoundException:
                //     setUsernameError(error.message);
                //     break;
                // case error instanceof IncorrectPasswordException:
                //     console.log(error.message);
                //     setPasswordError(error.message);
                //     break;
                // case error instanceof SessionNotFoundException:
                //     console.log(error.message);
                //     await handleSubmit();
                //     break;
                // default:
                //     showWarn("Failed to log in! Try again please.");
            }
        }
        setloading(false);
    };

    const shouldShowPasswordField = !usernameError && username.length > 0;
    const shouldShowButton = !passwordError && shouldShowPasswordField && password.length > 0;

    const navigate = useNavigate();


    return (
        <Card variant="outlined"

              sx={{
                  padding: 4,
                  paddingTop: 3,
                  paddingBottom: 2,
                  boxShadow: 3,
                  gap: 2,
                  backgroundColor: 'searchInput',
                  position: 'fixed',
                  top: '18%',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  width: {
                      xs: '85%',
                      sm: '400px'
                  },
                  margin: 'auto',

                  height:  shouldShowPasswordField ? '335px' : '240px',
                  transition: 'height 0.5s ease',
              }}>

            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',  textAlign: 'center'}}
            >
                Sign in
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
                        condition={shouldShowButton}>
                        <div>
                            <Button
                                loadingPosition="center"
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                Sign in
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
                            Don't have an account?{' '}
                            <Link
                                onClick={() => navigate("/cloud-storage/registration")}
                                sx={{color: '#1976d2', cursor: 'pointer'}}>
                                Sign up
                            </Link>

                        </Typography>

                    </Zoom>




                </Box>
            </form>
        </Card>
    )
}

