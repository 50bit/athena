import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import GoBackTopNav from '../Global/GoBackTopNav';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axiosInstance from '../../axios';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

    const [notAcceptedTeachers, setNotAcceptedTeachers] = React.useState([])
    const navigate = useNavigate();

    const getNotAcceptedTeachers =  async () => {
        const {data}  = await axiosInstance.get('/users/get_not_accepted_mohafezen')
        const tmpData = _.map(data,(d)=>{
            return {
                message: `طلب انضمام جديد من (${d.arabicName || d.name})`,
                time:`${_.replace(_.replace(_.replace(new Date(d.creationDate).toLocaleString(),/,/g," - "),/PM/g,"ص"),/AM/g,'م')}`,
                seen: false,
                data:d
            }
        })
        setNotAcceptedTeachers(tmpData)
    }

    React.useEffect(() => {
        getNotAcceptedTeachers();
    }, [])

    const goToJoinRequest = (data) => {
        navigate('/join-request',{
            state: data
        })
    }

    return (
        <Box sx={{ width: '100%', mb: 2, mt: 8 }} >
            <CssBaseline />
            <GoBackTopNav title="الإشعارات" />
            <Box sx={{ width: '100%' }}>
                <List>
                    {notAcceptedTeachers.map(({ time, message, seen, data }, index) => (
                        <ListItem sx={{ textAlign: 'start' }} button onClick={() => goToJoinRequest(data)} key={index} component="nav" divider>
                            <FiberManualRecordIcon sx={{ color: (!seen ? colors.grey[600] : colors.orangeAccent[100]) }} />
                            <ListItemText primary={message} />
                            <Typography sx={{ marginLeft: 'auto', color: colors.grey[600] }}>
                                {time}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Box>
    );
}
