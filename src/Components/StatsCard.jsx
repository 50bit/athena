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


const BorderLinearProgress = styled(LinearProgress)(({ theme, colors }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: colors.grey[900],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: colors.orangeAccent[100]
    },
    [`&`]: {
        rotate: "180deg"
    }
}));

const StyledAvatarGroup = styled('div')(({ theme, colors }) => ({
    '.MuiAvatar-root':{
        fontSize:'12px',
        alignItems:'center'
    }
}));

export default function StatsCardComponent({ data }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);



    const normalise = (value, min, max) => ((value - min) * 100) / (max - min);

    return (
        <Box container sx={{ flexGrow: 1, pl: 1, pr: 1 }}>
            <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 5, p: 1, mt: 2 }}>
                <CardContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }}>
                        <Grid item xs={6}>
                            <Typography variant="h4" sx={{ color: colors.primary[500], fontWeight: 'bold' }} gutterBottom>
                                {data.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'end' }}>
                            <Link component={RouterLink} sx={{ fontSize: 14, color: colors.primary[600], textDecoration: 'none', fontWeight: 'bold' }} to={data.buttonRoute}>{data.buttonTitle}</Link>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <StyledAvatarGroup>
                            <AvatarGroup max={4}>
                                {[...Array(data.statsCharts[0]?.totalCount || 0)].map((item) => (
                                    <Avatar alt="React" src="../../public/logo192.png" />
                                ))}
                            </AvatarGroup>
                        </StyledAvatarGroup>
                    </Grid>

                    <Grid container sx={{ mt: 2 }}>
                        {data.statsCharts.map((item) => (
                            <Grid item sx={{ mt: 2 }} xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="h4" sx={{ color: colors.primary[500], fontWeight: 'bold' }} gutterBottom>
                                            {item.subCount}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h4" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'end' }} gutterBottom>
                                            {item.totalCount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <BorderLinearProgress variant="determinate" value={normalise(item.subCount, 0, item.totalCount)} colors={colors} />
                                <Grid container sx={{ mt: 1 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" sx={{ color: colors.primary[500], fontWeight: 'bold' }} gutterBottom>
                                            {item.subCountTitle}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" sx={{ color: colors.primary[500], fontWeight: 'bold', textAlign: 'end' }} gutterBottom>
                                            {item.totalCountTitle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}