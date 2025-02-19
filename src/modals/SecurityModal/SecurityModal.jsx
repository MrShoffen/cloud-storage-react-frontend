import React, {useState} from "react";
import {Box, Button, Modal, Slide, Typography} from "@mui/material";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import AnimatedElement from "../../components/InputElements/AnimatedElement.jsx";
import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import ValidatedPasswordField from "../../components/InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../../components/InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";
import {sendEditUser} from "../../services/fetch/auth/user/SendEditUser.js";
import UnauthorizedException from "../../exception/UnauthorizedException.jsx";


export default function SecurityModal({open, onClose}) {


    const {auth} = useAuthContext();


    const [oldPassword, setOldPassword] = React.useState('');
    const [oldPasswordError, setOldPasswordError] = React.useState('');

    const [newPassword, setNewPassword] = React.useState('')
    const [newPasswordError, setNewPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');


    const [loading, setLoading] = useState(false);

    const {showSuccess, showWarn} = useNotification();
    const handleSave = async () => {
        try {
            setLoading(true);
            const editInformation = {oldPassword: oldPassword, newPassword: newPassword}
            await sendEditUser(editInformation, "/password");
            showSuccess("Пароль успешно изменен");

        } catch (error) {
            switch (true) {
                case error instanceof UnauthorizedException:
                    setOldPasswordError(error.message);
                    showWarn(error.message);
                    break;
                default:
                    console.log('Unknown error occurred! ');
            }
        }
        setLoading(false);
        setNewPassword('')
        setConfirmPassword('')
    };

    useNavigate();


    const handlePasswordClick = () => {
        setChangeConfirmModal(true);
    };

    const handlePasswordCancel = () => {
        setChangeConfirmModal(false);
    };

    const handlePasswordConfirm = async () => {
        setChangeConfirmModal(false);
        await handleSave();
    };

    const [changeConfirmModal, setChangeConfirmModal] = useState(false);


    const clearFields = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('')
    };

    if (auth.isAuthenticated) {
        return (
            <>
                <Modal open={open} onClose={() => {
                    onClose();
                    clearFields()
                }}>
                    <Slide in={open} direction={'down'} style={{transform: "translate(-50%, 0%)", marginTop: "70px",}}>
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
                                onClick={() => {
                                    onClose();
                                    clearFields()
                                }}
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

                            <Typography variant="h5" textAlign="center" sx={{width: '100%', mb: 1}}>
                                Смена пароля
                            </Typography>


                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2,}}>

                                <ValidatedPasswordField
                                    password={oldPassword}
                                    setPassword={setOldPassword}
                                    passwordError={oldPasswordError}
                                    setPasswordError={setOldPasswordError}
                                    label="Текущий пароль"
                                />

                                <AnimatedElement condition={!oldPasswordError && oldPassword.length > 0}>
                                    <ValidatedPasswordField
                                        password={newPassword}
                                        setPassword={setNewPassword}
                                        passwordError={newPasswordError}
                                        setPasswordError={setNewPasswordError}
                                        label="Новый пароль"
                                    />
                                </AnimatedElement>

                                <AnimatedElement
                                    condition={!oldPasswordError && oldPassword.length > 0 && !newPasswordError && newPassword.length > 0}>
                                    <ValidatedPasswordConfirmField
                                        confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}
                                        confirmPasswordError={confirmPasswordError}
                                        setConfirmPasswordError={setConfirmPasswordError}
                                        originalPassword={newPassword}
                                        label="Подтверждение пароля"
                                    />
                                </AnimatedElement>

                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button size="small" variant="outlined" onClick={() => {
                                        onClose();
                                        clearFields()
                                    }}>
                                        Отмена
                                    </Button>

                                    <Button variant="contained" size="small" onClick={handlePasswordClick}
                                            loading={loading}
                                            disabled={oldPasswordError || oldPassword.length === 0 || newPasswordError || newPassword.length === 0 || confirmPasswordError || confirmPassword.length === 0}
                                    >
                                        Сменить пароль
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Slide>

                </Modal>


                <Modal
                    open={changeConfirmModal}
                    onClose={handlePasswordCancel}
                    aria-labelledby="confirm-delete-modal"
                    aria-describedby="confirm-delete-modal-description"
                >
                    <Slide in={changeConfirmModal} direction={'down'} style={{margin: 'auto', marginTop: "170px",}}>
                        <Card variant="outlined"
                              sx={{
                                  backgroundColor: "background.paper",
                                  width: 300,
                                  boxShadow: 24,
                                  p: 4,
                                  borderRadius: 2,
                              }}
                        >
                            <Typography
                                component="h2"
                                variant="h6"
                                sx={{textAlign: "center", mb: 1}}
                            >
                                Вы уверены, что хотите сменить пароль?
                            </Typography >
                            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary'}}>
                                After changing your password, only this active session will remain – all others will be invalidated.
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant="outlined" onClick={handlePasswordCancel}>
                                    Нет
                                </Button>
                                <Button variant="contained" color="error" onClick={handlePasswordConfirm}>
                                    Да
                                </Button>
                            </Box>
                        </Card>
                    </Slide>
                </Modal>

            </>

        )
            ;
    }
};