import * as React from 'react';
import Box from '@mui/material/Box';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import _ from 'lodash';
export default function CommentCard({ commentData }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

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

    return (
        <Box container sx={{ flexGrow: 1, pl: 1, pr: 1, mt: 2 }}>
            <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 5 }}>
                <CardContent sx={{ paddingBottom: '10px!important', marginTop: '10px!important' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }} sx={{ pl: 4 }}>
                        <Grid item xs={12} sx={{ textAlign: 'end' }}>
                            <Typography variant="body1" sx={{ color: colors.primary[500], textAlign: 'start' }} gutterBottom>
                                {`${commentData.namePrefix} / ${commentData.name} - جلسة بتاريخ ${formatDate(commentData.date)}`}
                            </Typography>
                            <Rating sx={{ float: 'right' }} name="half-rating-read" defaultValue={2} value={commentData.rating} readOnly />

                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'start' }}>
                            <Typography variant="body2" sx={{ color: colors.primary[500], textAlign: 'start' }} gutterBottom>
                                {`الملاحظات :  ${commentData.text}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}