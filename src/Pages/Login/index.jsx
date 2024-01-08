import * as React from 'react';
import Box from '@mui/material/Box';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme, TextField, Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import { ReactComponent as Wave } from './wave.svg';
import axiosInstance from '../../axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';
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
                type={field == "password" ? "password" : "text"}
            />
        </Grid>
    </Grid>

))()

export default function Login() {
    localStorage.clear();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const [value, setValue] = React.useState({
        email: '',
        password: ''
    })
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const login = async () => {
        let formData = new FormData();
        formData.append('email', value.email);
        formData.append('password', value.password);
        try {
            const res = await axiosInstance.post('/authenticate/login', formData)
            if (res.status == 401 || (res.roleId !== 1 && res.roleId !== 2)) {
                setMessage(" البريد الإلكترونى او كلمة المرور غير صحيحين")
                setIsError(true)
                return;
            }
            if (res.status == 200) {
                setMessage(" تم تسجيل الدخول بنجاح")
                setIsError(false)
                localStorage.setItem('token', res.token)
                localStorage.setItem('expiration', res.expiration)
                localStorage.setItem('roleId', res.roleId)
                navigate("/")
            }

            setOpenSnackBar(true)
        } catch (error) {
            console.log(error)
            setMessage(" حدث خطأ اثناء تسجيل الدخول")
            setIsError(true)
            setOpenSnackBar(true)
        }

    }

    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    return (
        <Box container sx={{ flexGrow: 1 }}>
            <div style={{ width: '100%', minHeight: '300px', position: 'relative', backgroundColor: colors.primary[500] }}>
                <div style={{ width: '100%', position: 'absolute', top: '300px' }}>
                    <Wave />
                </div>
            </div>
            <Stack mt={10} p={3} spacing={4}>
                <StyledTextField value={value} colors={colors} field="email" setValue={setValue} label="البريد الإلكترونى" />
                <StyledTextField value={value} colors={colors} field="password" setValue={setValue} label="كلمة المرور" />
                <Button
                    variant="filled"
                    sx={{ ml: 2, borderRadius: 20, width: "100%", fontWeight: 'bold', color: colors.primary[400], background: colors.gradient[100], border: 'none' }}
                    onClick={login}
                >
                    تسجيل الدخول
                </Button>
            </Stack>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity={isError ? "error" : "success"}> {message}</Alert>
            </Snackbar>
        </Box>
    );
}