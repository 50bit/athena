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

export default function CommentCard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);




    return (
        <Box container sx={{ flexGrow: 1, pl: 1, pr: 1, mt: 2 }}>
            <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 5 }}>
                <CardContent sx={{ paddingBottom: '10px!important', marginTop: '10px!important' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }} sx={{ pl:4 }}>
                        <Grid item xs={12} sx={{ textAlign: 'end' }}>
                            <Typography variant="body1" sx={{ color: colors.primary[500], textAlign: 'start' }} gutterBottom>
                                الشيخ / على أحمد - جلسة بتاريخ 18/12/2023
                            </Typography>
                            <Rating sx={{ float: 'right',mb:1 }} name="half-rating-read" defaultValue={2} readOnly />
                            <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start', display:'inline-block' }} gutterBottom>
                                الملاحظات :  هذا النص  هو مثال  لنص  يمكن أن يستبدل فى نفس المساحة
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}