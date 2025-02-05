import {Box, IconButton, Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const HeaderSearchField = () => {
    return (
        <Box
            sx={{
                border: '1px solid ',
                m: '8px',
                borderRadius: 2,
                backgroundColor: 'searchInput',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                borderColor: 'divider',
                boxShadow: 2,
                pl: 1,
                pr: 1,
                width: {xs: '100%', sm: '300px',}
            }}
        >
            <Input variant="outlined" placeholder="Search…" disableUnderline
                   endAdornment={
                       <IconButton sx={{mr: -1}}>
                           <SearchIcon sx={{color: 'primary.main',}}/>
                       </IconButton>}
                   sx={{
                       height: '40px',
                       alignSelf: 'center',
                       width: '100%',
                   }}/>
        </Box>
    )
}