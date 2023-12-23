import * as React from 'react';
import BarChartComponent from '../../Components/BarChart'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import StatsCardComponent from '../../Components/StatsCard';
import TopBar from "..//Global/TopBar";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InfoCard from '../../Components/InfoCard'
import GoBackTopNav from '../Global/GoBackTopNav'
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import CommentCard from '../../Components/CommentCard';

const StyledTextPaper = styled(Paper)(({ theme, colors }) => ({
    borderRadius: 20,
    padding: theme.spacing(2),
    backgroundColor: colors.grey[900],
    color: colors.primary[500],
    fontSize: 10,
    width: '100%'
}));

export default function UserInfo() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

    return (
        <Box sx={{ mt: 10, mb: 2 }}>
            <CssBaseline />
            <GoBackTopNav title="" />
            <InfoCard data={{}} />
            <Grid container p={2}>
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1 }} gutterBottom>
                            البريد الإليكترونى
                        </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                            ahmed42@gmail.com
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
                            0123456789
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
                            22/5/1992
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
                            18/6/2022
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
                            18/6/2022 - 11:12 صباحا
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', mr: 1, mt: 2 }} gutterBottom>
                    نبذة عنه
                </Typography>
                <Grid container>
                    <StyledTextPaper square={false} colors={colors}>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.                    
                    </StyledTextPaper>
                </Grid>
            </Grid>
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                الملاحظات
            </Typography>
            <CommentCard />

        </Box>
    )
}