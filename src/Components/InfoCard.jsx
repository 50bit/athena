import * as React from 'react';
import Box from '@mui/material/Box';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CategoryIcon from '@mui/icons-material/Category';

export default function InfoCard({ data }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);




    return (
        <Box container sx={{ flexGrow: 1, pl: 1, pr: 1, mt: 2 }}>
            <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 5 }}>
                <CardContent sx={{ paddingBottom: '10px!important', marginTop: '10px!important' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }} sx={{ textAlign: 'center' }}>
                        <Grid item xs={4}>
                            <Avatar sx={{ minWidth: 80, minHeight: 80, m: '0 auto' }} alt="React" src="../../public/logo192.png" />
                            <Rating sx={{ m: '0px auto', mt: 2 }} name="half-rating-read" defaultValue={2} readOnly />
                        </Grid>
                        <Grid item xs={8} sx={{ textAlign: 'end' }}>
                            <Typography variant="h4" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start' }} gutterBottom>
                                محمد أحمد محمد
                            </Typography>
                            <Grid container>
                                <FmdGoodOutlinedIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        مصر
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <PersonOutlineOutlinedIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        عدد الطلاب :  42 طالب
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <CategoryIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        النشاط : حفظ
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <GroupsOutlinedIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        الحلقات : 1 حلقة
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}