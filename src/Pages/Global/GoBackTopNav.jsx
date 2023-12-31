
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function GoBackTopNav({ title }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: colors.primary[400] }} position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="end"
                        onClick={()=>{navigate(-1)}}
                    >
                        <KeyboardArrowRightIcon sx={{ color: colors.primary[500] }} />
                    </IconButton>
                    <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}