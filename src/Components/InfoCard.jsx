import * as React from 'react';
import Box from '@mui/material/Box';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import axiosInstance from '../axios';
import _ from 'lodash'
const BASE_URL = "http://173.249.60.28:60772";

const trimImagePath = (imagePath) => {
    if(!_.isEmpty(imagePath))
        return _.replace(imagePath,"/var/netcore/hefz_quran_api/wwwroot",BASE_URL)
    return imagePath
}

export default function InfoCard({ infoCardData }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

    return (
        <Box container sx={{ flexGrow: 1, pl: 1, pr: 1, mt: 2 }}>
            <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 5 }}>
                <CardContent sx={{ paddingBottom: '10px!important', marginTop: '10px!important' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }} sx={{ textAlign: 'center' }}>
                        <Grid item xs={4}>
                            <Avatar sx={{ minWidth: 80, minHeight: 80, m: '0 auto' }} alt="React" src={trimImagePath(infoCardData.imagePath) || ""} />
                            <Rating sx={{ m: '0px auto', mt: 2 }} name="half-rating-read"  defaultValue={2} value={infoCardData.rating || 0} readOnly />
                        </Grid>
                        <Grid item xs={8} sx={{ textAlign: 'end' }}>
                            <Typography variant="h4" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'start' }} gutterBottom>
                                {infoCardData.arabicName || infoCardData.name}
                            </Typography>
                            <Grid container>
                                <FmdGoodOutlinedIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        {infoCardData.country}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {(infoCardData.stutdentsCount >= 0 && <Grid container>
                                <PersonOutlineOutlinedIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        عدد الطلاب :  {infoCardData.stutdentsCount} طالب
                                    </Typography>
                                </Grid>
                            </Grid>)}
                            {/* <Grid container>
                                <CategoryIcon sx={{ color: colors.grey[700], fontSize: '14px' }} />
                                <Grid item xs={11} >
                                    <Typography variant="body2" sx={{ color: colors.grey[700], fontWeight: 'bold', textAlign: 'start', mr: 1 }} gutterBottom>
                                        النشاط : حفظ
                                    </Typography>
                                </Grid>
                            </Grid> */}
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