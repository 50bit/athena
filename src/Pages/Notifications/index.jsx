import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import GoBackTopNav from '../Global/GoBackTopNav'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


export default function Notifications() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);


    return (
        <Box sx={{ width: '100%', mb: 2, mt: 8 }} >
            <CssBaseline />
            <GoBackTopNav title="الإشعارات" />
            <Box sx={{ width: '100%' }}>
                <List>
                    {messageExamples.map(({ time, message,seen }, index) => (
                        <ListItem sx={{ textAlign: 'start' }} button key={index} component="nav" divider>
                            <FiberManualRecordIcon sx={{color:(!seen?colors.grey[600]:colors.orangeAccent[100])}}/>
                            <ListItemText primary={message} />
                            <Typography sx={{marginLeft:'auto',color:colors.grey[600]}}>
                                {time}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Box>
    );
}

const messageExamples = [
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:true
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:true
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:true
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    },
    {
        message: 'طلب انضمام جديد من ( عمر على )',
        time: '8:22 ص',
        seen:false
    }
];