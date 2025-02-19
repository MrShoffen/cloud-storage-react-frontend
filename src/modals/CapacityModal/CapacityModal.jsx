import React, {useState} from "react";
import {Box, Container, LinearProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";
import bytes from "bytes";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";

export const CapacityModal = () => {

    const {storageUsed} = useStorageOperations();
    const {auth} = useAuthContext();

    const plan = auth.user.storagePlan;
    const maxCapacity = plan === 'BASIC' ? 1 : (plan === 'STANDARD' ? 2 : 4);
    const maxCapByte = (plan === 'BASIC' ? 1024 : (plan === 'STANDARD' ? 2048 : 4096))*1024*1024;

    const [showModal, setShowModal] = useState(true);

    const handleArrowClick = () => {
        setShowModal(prev => !prev);
    }

    const bottomPosition = showModal ? "130px" : '50px';


    return (<Container
        sx={{
            zIndex: 3000, position: 'fixed', left: '50%', bottom: bottomPosition, transform: 'translateX(-50%)',
            tabIndex: "-1",
            transition: 'bottom 0.2s ease-in-out', backgroundColor: 'transparent',

        }}
        disableGutters>
        <Box
            sx={{
                position: 'absolute',
                left: 8,
                width: "96%",
                maxWidth: '240px',
                height: "200px",
                backgroundColor: "transparent",
                overflow: 'hidden',
            }}
        >

            <Box
                sx={{
                    position: 'relative',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    border: '1px solid',
                    borderColor: 'gray',
                    width: '60px',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(28,50,163,0.9)',
                    height: '60px',
                }}
            >

                <IconButton
                    onClick={handleArrowClick}
                    sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        width: '50px',
                        height: '50px',
                        color: 'rgb(230,230,230)',
                    }}
                >
                    <KeyboardArrowDownIcon
                        sx={{fontSize: '40px', transform: showModal ? 'none' : 'scaleY(-1)'}}/>
                </IconButton>

            </Box>

            <Box
                sx={{

                    width: '100%',
                    background: 'linear-gradient(180deg, rgba(28,50,163,0.9) 0%, rgba(16,113,195,1) 100%)',
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    p: 1,
                    pb: 0,
                    height: '80px',
                    overflowY: 'auto',
                    border: '1px solid',
                    borderColor: 'gray',
                    color: 'rgb(230,230,230)',
                }}>
                <LinearProgress variant="determinate"
                                value={(storageUsed * 100 / (maxCapByte)) >= 100 ? 100 : (storageUsed * 100 / (maxCapByte))}
                                sx={{
                                    width: '100%',
                                    height: 10,
                                    mt: 0.8,
                                    borderRadius: 2,
                                    top: 0,
                                    backgroundColor: 'rgba(0,0,0,0.48)',
                                    '& .MuiLinearProgress-bar': {
                                        background: 'white',
                                    }
                                }}
                />

                <Typography variant="body2" sx={{
                    mt: 1.5, width: '100%', fontSize: '16px', fontWeight: '400',
                    textShadow: '6px 5px 5px rgba(0, 0, 0, 0.55)',
                    textAlign: 'center'
                }}>
                    Занято {bytes(storageUsed)} из {maxCapacity} GB
                </Typography>


            </Box>


        </Box>
    </Container>);
};