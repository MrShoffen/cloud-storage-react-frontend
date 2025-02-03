import {Box, IconButton, Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const InputSearch = () => {
    return (
        <Box
            sx={{
                border: '1px solid ',
                mr: '8px',
                borderRadius: 2,
                backgroundColor: 'searchInput',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Для Safari
                borderColor: 'divider',
                boxShadow: 2,
                pl: 1,
                pr: 1,
                ml: '8px',
                width: {
                    xs: '100%',
                    sm: '300px',
                }
            }}
        >
            <Input
                variant="outlined"
                placeholder="Search anything…"
                disableUnderline
                endAdornment={
                    <IconButton sx={{mr: -1}}>
                        <SearchIcon sx={{color: 'primary.main',}}/>
                    </IconButton>
                }
                sx={{
                    height: '40px',
                    alignSelf: 'center',
                    width: '100%',

                }}
            />
        </Box>
    )
}