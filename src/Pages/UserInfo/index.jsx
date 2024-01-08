import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InfoCard from '../../Components/InfoCard';
import GoBackTopNav from '../Global/GoBackTopNav';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import CommentCard from '../../Components/CommentCard';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './style.css';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import axiosInstance from '../../axios';
import { saveAs } from 'file-saver';
const BASE_URL = "http://173.249.60.28:60772";

function createData(id, requiredPaymentDate, paymentDate, paymentStatus) {
    return { id, requiredPaymentDate, paymentDate, paymentStatus };
}

const rows = [
    createData('عمر على (#123456)', '18/02/2023', '18/02/2023', 'تم الدفع'),
    createData('عمر على (#123456)', '18/02/2023', '18/02/2023', 'ليس بعد'),
    createData('عمر على (#123456)', '18/02/2023', '18/02/2023', 'ليس بعد'),
    createData('عمر على (#123456)', '18/02/2023', '18/02/2023', 'ليس بعد'),
    createData('عمر على (#123456)', '18/02/2023', '18/02/2023', 'ليس بعد'),
];

const StyledTextPaper = styled(Paper)(({ theme, colors }) => ({
    borderRadius: 20,
    padding: theme.spacing(2),
    backgroundColor: colors.grey[900],
    color: colors.primary[500],
    fontSize: 10,
    width: '100%'
}));

const StyledPaymentPaper = styled(Paper)(({ theme, colors }) => ({
    borderRadius: 20,
    padding: theme.spacing(1),
    backgroundColor: colors.primary[500],
    color: colors.primary[900],
    fontSize: 10,
    width: '100%',
    borderRadius: 30,
    width: '80ch',
    margin: '15px auto'
}));

export default function UserInfo() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { state } = useLocation();
    const [userData, setUserData] = React.useState(state);
    const formatDate = (date) => {
        const d = new Date(date)
        if (isValidDate(d)) {
            return `${_.replace(_.replace(_.replace(d.toLocaleString(), /,/g, " - "), /PM/g, "ص"), /AM/g, 'م')}`;
        }
        return date
    }

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    }

    const [comments, setComments] = React.useState([])
    const [ejazat, setEjazat] = React.useState([])
    const getComments = async () => {
        let result = []
        if (userData.roleId == 3) {
            // student
            const { data } = await axiosInstance.get(`/notes/get_all_student_notes?studentId=${userData.id}`);
            result = data
        }
        else if (userData.roleId == 2) {
            // teacher
            const { data } = await axiosInstance.get(`/users/report/${userData.uId}`)
            result = data
        }
        setComments(result)
    }
    const getEjazat = async () => {
        const {data} =  await axiosInstance.get(`/users/ejazat/${userData.uId}`)
        // const { data } = await axiosInstance.get(`/users/ejazat/d860e743-a80e-491c-83c2-1a646889b4c5`)
        setEjazat(data)
    }
    React.useEffect(() => {
        getComments()
        getEjazat()
    }, [])

    const downloadImage = (path) => {
        if (path) {
            const name = path.split("/").slice(-1)
            saveAs(path, name)
        }
    }

    return (
        <Box sx={{ mt: 10, mb: 2 }}>
            <CssBaseline />
            <GoBackTopNav title="" />
            <InfoCard infoCardData={userData} />
            <Grid container p={2}>
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1 }} gutterBottom>
                            البريد الإليكترونى
                        </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                            {userData.email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1 }} gutterBottom>
                            رقم الهاتف
                        </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                            {userData.phoneNumber}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1 }} gutterBottom>
                            تاريخ الميلاد
                        </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                            {userData.birthyear}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1 }} gutterBottom>
                            تاريخ الإنضمام
                        </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                            {formatDate(userData.creationDate)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1 }} gutterBottom>
                            تاريخ اخر نشاط
                        </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                            {formatDate(userData.lastActivityDate)}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1, mt: 2 }} gutterBottom>
                    نبذة عنه
                </Typography>
                <Grid container>
                    <StyledTextPaper square={false} colors={colors}>
                        {userData.summery}
                    </StyledTextPaper>
                </Grid>
            </Grid>
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Typography variant="h4" sx={{ pr: 2, color: colors.primary[500], fontWeight: 'bold' }}>
                الإجازات
            </Typography>
            <Stack direction="column" sx={{ m: "15px" }} spacing={2}>
                {
                    (ejazat.map((ejaza,index) => {
                        return (
                            <Grid container onClick={(e) => { downloadImage(`${BASE_URL}${ejaza.filePath}`) }} sx={{ cursor: 'pointer' }}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" sx={{ pr: 1, color: colors.primary[500], float: 'right' }}>
                                        إجازة {index + 1}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <FileDownloadOutlinedIcon sx={{ float: 'left', color: colors.primary[500] }} />
                                </Grid>
                            </Grid>
                        )
                    }))
                }
            </Stack>
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Typography variant="h4" sx={{ pr: 2, color: colors.primary[500], fontWeight: 'bold' }}>
                رقم الحساب
            </Typography>
            <StyledPaymentPaper colors={colors}>
                <Stack direction="column" sx={{ m: "15px" }} spacing={2}>
                    <Typography variant="h6" sx={{ pr: 1, color: colors.primary[900], float: 'right' }}>
                        رقم البطاقة
                    </Typography>
                    <Typography variant="h2" sx={{ pr: 1, color: colors.primary[900], fontWeight: 'bold', float: 'right', textAlign: 'center' }}>
                        51547922289112378
                    </Typography>
                    <Typography variant="h6" sx={{ pr: 1, color: colors.primary[900], float: 'right' }}>
                        تاريخ الانتهاء
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h2" sx={{ pr: 1, color: colors.primary[900], fontWeight: 'bold', float: 'right' }}>
                                12/24
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="h4" sx={{ color: colors.orangeAccent[100], float: 'left', pr: 1 }}>
                                موثقة
                            </Typography>
                            <BeenhereOutlinedIcon sx={{ float: 'left', color: colors.orangeAccent[100] }} />
                        </Grid>
                    </Grid>
                </Stack>
            </StyledPaymentPaper>
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Grid container>
                <Grid item xs={6} sx={{ alignItems: 'baseline' }}>
                    <Typography variant="h4" sx={{ pr: 2, color: colors.primary[500], fontWeight: 'bold', float: 'right' }}>
                        سجل الدفعات
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Button
                        id="aggregation-button"
                        aria-controls={open ? 'aggregation-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="outlined"
                        disableElevation
                        onClick={handleClick}
                        startIcon={<KeyboardArrowDownIcon sx={{ m: 0, alignItems: 'center', p: 0, mt: "-4px" }} />}
                        sx={{ ml: 2, float: 'left', color: colors.primary[500], border: 'none' }}
                    >
                        اخر 3 شهور
                    </Button>
                    <Menu
                        id="aggregation-menu"
                        MenuListProps={{
                            'aria-labelledby': 'aggregation-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        colors={colors}
                    >
                        <MenuItem onClick={handleClose} sx={{ minWidth: 180 }} >
                            <Typography variant="body2" sx={{ color: colors.primary[500] }}>
                                اخر 3 شهور
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <TableContainer sx={{ boxShadow: 'none', backgroundColor: 'none' }} component={Paper}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" sx={{ color: colors.primary[500] }}>رقم الطالب</TableCell>
                            <TableCell align="right" sx={{ color: colors.primary[500] }}>تاريخ الدفع المستحق</TableCell>
                            <TableCell align="right" sx={{ color: colors.primary[500] }}>تاريخ الدفع</TableCell>
                            <TableCell align="right" sx={{ color: colors.primary[500] }}>حالة الدفع</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right" sx={{ color: colors.primary[500] }} component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right" sx={{ color: colors.primary[500] }}>{row.requiredPaymentDate}</TableCell>
                                <TableCell align="right" sx={{ color: colors.primary[500] }}>{row.paymentDate}</TableCell>
                                <TableCell align="center" sx={{ textAlign: 'center!important', alignItems: 'center', display: 'flex', color: colors.primary[500] }}>
                                    <FiberManualRecordIcon sx={{ color: (row.paymentStatus == 'تم الدفع' ? colors.greenAccent[400] : colors.orangeAccent[100]) }} />
                                    {row.paymentStatus}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Typography variant="h4" sx={{ pr: 2, color: colors.primary[500], fontWeight: 'bold' }}>
                الملاحظات
            </Typography>
            {comments.map((comment) => {
                return (
                    <CommentCard commentData={{
                        name: userData.roleId === 2 ? comment.student?.name || '' : comment.mohafez?.name,
                        date: comment.date,
                        rate: comment.rating,
                        text: comment.text,
                        namePrefix: userData.roleId === 2 ? "الطالب" : "الشيخ"
                    }} />
                )
            })}

        </Box>
    )
}