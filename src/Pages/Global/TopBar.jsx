
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

const Search = styled('div')(({ theme, colors }) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: colors.primary[400],
    '&:hover': {
        backgroundColor: colors.primary[400],
    },
    margin: '0px 5px 0px 10px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    color: colors.primary[700],
    border: `1px solid ${colors.primary[900]}`
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '0px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        paddingRight: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '50ch',
            '&:focus': {
                width: '60ch',
            },
        }
    },
}));

export default function TopBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: colors.primary[400] }} position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="end"
                    >
                        <KeyboardArrowRightIcon sx={{color: colors.primary[500] }} />
                    </IconButton>
                    <Search colors={colors}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color: colors.primary[500] }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="ابحث عن شيخ أو طالب .."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="open drawer"
                        sx={{ mr: 'auto' }}
                        component={RouterLink} to="/notifications"
                    >
                        <NotificationsIcon sx={{color: colors.primary[500] }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}