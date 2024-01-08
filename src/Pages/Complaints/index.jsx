import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import GoBackTopNav from '../Global/GoBackTopNav';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../axios';
import _ from 'lodash';
import './style.css';

function createData(id, date, complaints) {
    return { id, date, complaints };
}


export default function Complaints() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const [complaints,setComplaints] = React.useState([])
    const getComplaints =  async () => {
        const {data}  = await axiosInstance.get('/complaints')
        const tmpData = _.map(data,(d)=>{
            return createData(`${d.user?.name || ''} (#${d.user?.normalUserId || ''})`,`${new Date(d.createdDate).toLocaleDateString()}`,`${d.text}`)
        })
        setComplaints(tmpData)
    }

    React.useEffect(() => {
        getComplaints();
    }, [])

    return (
        <Box sx={{ width: '100%', mb: 2, mt: 8 }} >
            <CssBaseline />
            <GoBackTopNav title="الإقتراحات و الشكاوى" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color:colors.primary[500]}}>اسم و رقم الطالب</TableCell>
                            <TableCell align="right" sx={{color:colors.primary[500]}}>تاريخ الإقتراح أو الشكوى</TableCell>
                            <TableCell align="right" sx={{color:colors.primary[500]}}>الإقتراح او الشكوى</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {complaints.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{color:colors.primary[500]}}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="right" sx={{color:colors.primary[500]}}>{row.date}</TableCell>
                                <TableCell align="right" sx={{color:colors.primary[500]}}>{row.complaints}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
