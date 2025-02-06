import React, {useEffect, useState} from "react";
import {Box, Button, Modal, Slide, Typography} from "@mui/material";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import ValidatedAvatarInput from "../../components/InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import Card from "@mui/material/Card";
import ValidatedUsernameTextField from "../../components/InputElements/TextField/ValidatedUsernameTextField.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";
import {sendEdit} from "../../services/fetch/auth/SendEdit.js";
import ConflictException from "../../exception/ConflictException.jsx";


export default function ProfileModal({open, onClose}) {
    const {auth, login} = useAuthContext();

    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarLoading, setAvatarLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    useEffect(() => {
        setAvatarUrl(auth.isAuthenticated ? auth.user.avatarUrl : '');
        setUsername(auth.isAuthenticated ? auth.user.username : '')
    }, [auth.user, open]);

    const [loading, setLoading] = useState(false);
    const {showSuccess, showError, showWarn} = useNotification();

    const handleSave = async () => {
        try {
            setLoading(true);
            const editInformation = {newUsername: username, newAvatarUrl: avatarUrl};

            const newData = await sendEdit(editInformation, "/profile");
            login(newData);
            showSuccess("Information updated successfully.");
        } catch (error) {
            switch (true) {
                case error instanceof ConflictException:
                    setUsernameError(error.message);
                    showWarn(error.message);
                    break;

                default:
                    console.log('Unknown error occurred! ');
                    onClose();
                    showError('Unknown error occurred!');
            }
        }
        setLoading(false);
    };


    if (auth.isAuthenticated) {
        return (
            <Modal open={open} onClose={onClose}>
                <Slide in={open} direction={'down'} style={{transform: "translate(-50%, 0%)", marginTop: "70px"}}>
                    <Card variant="outlined"
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: {sm: '400px', xs: '100%'},
                              maxWidth: {sm: '400px', xs: '90%'},
                              padding: 2,
                              gap: 2,
                              margin: 'auto',
                              backgroundColor: "modal",
                              backdropFilter: 'blur(6px)',
                              WebkitBackdropFilter: 'blur(6px)',
                              boxShadow: 5,
                              borderRadius: 2,
                              position: "relative",
                          }}
                    >
                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                width: '25px',
                                height: '25px',
                            }}
                        >
                            <CloseIcon sx={{fontSize: '25px'}}/>
                        </IconButton>

                        <Typography variant="h5" textAlign="center" sx={{width: '100%', mb: -2}}>
                            Edit Profile
                        </Typography>

                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1,}}>
                            <ValidatedAvatarInput
                                setAvatarUrl={setAvatarUrl}
                                initialAvatarUrl={avatarUrl}
                                avatarLoading={avatarLoading}
                                setAvatarLoading={setAvatarLoading}
                            />

                            <ValidatedUsernameTextField
                                username={username}
                                setUsername={setUsername}
                                usernameError={usernameError}
                                setUsernameError={setUsernameError}
                            />

                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                <Button size="small" variant="outlined" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleSave}
                                    loading={loading || avatarLoading}
                                    disabled={(usernameError || username === auth.user.username || username.length === 0) && (avatarUrl === auth.user.avatarUrl)}
                                >
                                    Save
                                </Button>
                            </Box>

                        </Box>
                    </Card>
                </Slide>
            </Modal>
        );
    }
};