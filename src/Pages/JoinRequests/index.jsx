import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, tokens } from '../../theme';
import { TextField, useTheme } from '@mui/material';
import GoBackTopNav from '../Global/GoBackTopNav';
import styled from '@emotion/styled';
import './style.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axiosInstance from '../../axios';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { saveAs } from 'file-saver';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://173.249.60.28:60772";

const StyledTextPaper = styled(Paper)(({ theme, colors }) => ({
    borderRadius: 20,
    padding: theme.spacing(2),
    backgroundColor: colors.grey[900],
    color: colors.primary[500],
    fontSize: 10,
    width: '100%'
}));

const StyledTextField = styled(({ value, setValue, label, field, colors }) => (
    <Grid container>
        <Grid xs={12} columnGap={2}>
            <label style={{ direction: 'rtl', textAlign: 'start', color: colors.primary[500] }}>{label}</label>
            <TextField className='formTextField' id="outlined-basic" variant="outlined"
                InputProps={{ style: { borderRadius: "20px", direction: 'rtl', textAlign: 'start', color: colors.primary[500], backgroundColor: colors.grey[900] } }}
                InputLabelProps={{ shrink: false }}
                fullWidth={true}
                onChange={(e) => {
                    const newVal = JSON.parse(JSON.stringify(value))
                    newVal[field] = e.target.value
                    setValue(newVal)
                }}
                value={value[field]}
                disabled={true}
            />
        </Grid>
    </Grid>

))()

export default function JoinRequests() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [value, setValue] = React.useState({
        name: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        birthday: '',
        birthmonth: '',
        birthyear: '',
        summery: ''
    })
    const { state } = useLocation();
    const [userData, setUserData] = React.useState(state);

    const [result, setResult] = React.useState('');


    const getuserDataValue = () => {
        return _.pick(userData, ['name', 'email', 'phoneNumber', 'country', 'city', 'birthday', 'birthmonth', 'birthyear', 'summery'])
    }

    const acceptTeacher = async () => {
        const response = await axiosInstance.put(`/users/accept_mohafez/${userData.uId}`);
        setResult(response.message == "Mohafez accepted" ? "تم قبول المحفظ" : response.message)
        setOpenSnackBar(true)
        setTimeout(() => {
            navigate("/notifications")
        }, 1000)
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const [ejazat, setEjazat] = React.useState([])

    const getEjazat = async () => {
        const { data } = await axiosInstance.get(`/users/ejazat/${userData.uId}`)
        // const { data } = await axiosInstance.get(`/users/ejazat/d860e743-a80e-491c-83c2-1a646889b4c5`)
        setEjazat(data)
    }

    React.useEffect(() => {
        setValue({ ...value, ...getuserDataValue() })
        getEjazat()
    }, [])

    const downloadImage = (path) => {
        if (path) {
            const name = path.split("/").slice(-1)
            saveAs(path, name)
        }
    }


    return (
        <Box sx={{ width: '100%', mb: 2, mt: 8 }} >
            <CssBaseline />
            <GoBackTopNav title="طلبات الإنضمام" />
            <Box sx={{ width: '100%', mt: 10 }}>
                <Stack p={2} spacing={4}>
                    <StyledTextField value={value} colors={colors} field="name" setValue={setValue} label="الاسم" />
                    <StyledTextField value={value} colors={colors} field="email" setValue={setValue} label="البريد الإلكترونى" />
                    <StyledTextField value={value} colors={colors} field="phoneNumber" setValue={setValue} label="رقم الهاتف" />
                    <StyledTextField value={value} colors={colors} field="country" setValue={setValue} label="الدولة" />
                    <StyledTextField value={value} colors={colors} field="city" setValue={setValue} label="المحافظة" />

                    <Stack>
                        <Grid container columnGap={1}>
                            <Grid xs>
                                <StyledTextField value={value} colors={colors} field="birthday" setValue={setValue} label="تاريخ الميلاد" />
                            </Grid>
                            <Grid xs>
                                <StyledTextField value={value} colors={colors} field="birthmonth" setValue={setValue} label="" />

                            </Grid>
                            <Grid xs>
                                <StyledTextField value={value} colors={colors} field="birthyear" setValue={setValue} label="" />
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
                <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
                <Typography variant="h4" sx={{ pr: 2, color: colors.primary[500], fontWeight: 'bold' }}>
                    الإجازات
                </Typography>
                <Stack direction="column" m={2} spacing={2}>
                    {
                        (ejazat.map((ejaza, index) => {
                            return (
                                <Grid onClick={(e) => { downloadImage(`${BASE_URL}${ejaza.filePath}`) }} container style={{ backgroundColor: colors.grey[900], borderRadius: 20, padding: 10, cursor: 'pointer' }}>
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
                <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 5, mt: 3 }} gutterBottom>
                    نبذة عنه
                </Typography>
                <Grid container pr={2} pl={2}>
                    <StyledTextPaper square={false} colors={colors}>
                        {value.summery}
                    </StyledTextPaper>
                </Grid>

                <Grid container columnSpacing={2} mb={4} mt={4} alignItems="center" justifyContent="center">
                    <Grid item xs={4}>
                        <Button
                            variant="filled"
                            sx={{ ml: 2, borderRadius: 20, width: "100%", fontWeight: 'bold', color: colors.primary[400], background: colors.gradient[100], border: 'none' }}
                            onClick={acceptTeacher}
                        >
                            قبول الطلب
                        </Button>
                    </Grid>
                    <Grid item xs={4} >
                        <Button
                            variant="filled"
                            sx={{ ml: 2, borderRadius: 20, width: "100%", fontWeight: 'bold', color: colors.primary[500], border: `1px solid ${colors.primary[500]}` }}
                        >
                            رفض الطلب
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity="success"> {result}</Alert>
            </Snackbar>
        </Box>
    );
}
