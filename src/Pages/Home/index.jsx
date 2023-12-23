import * as React from 'react';
import BarChartComponent from '../../Components/BarChart'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import StatsCardComponent from '../../Components/StatsCard';
import TopBar from "..//Global/TopBar";

export default function Home() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const teacherData = {
        title: "الشيوخ",
        buttonTitle: "رؤية الكل",
        buttonRoute: "/test",
        statsCharts: [
            {
                totalCount: 235,
                subCount: 186,
                totalCountTitle: "كل الشيوخ",
                subCountTitle: "الشيوخ العاملين",
                imageSrc: "../../public/logo192.png",
                imageAlt: "React"
            }
        ]
    }
    const studentData = {
        title: "الطلاب",
        buttonTitle: "رؤية الكل",
        buttonRoute: "/test",
        statsCharts: [
            {
                totalCount: 846,
                subCount: 159,
                totalCountTitle: "كل الطلاب",
                subCountTitle: "طلاب الحلقات",
                imageSrc: "../../public/logo192.png",
                imageAlt: "React"
            },
            {
                totalCount: 846,
                subCount: 246,
                totalCountTitle: "كل الطلاب",
                subCountTitle: "طلاب الإجازات",
                imageSrc: "../../public/logo192.png",
                imageAlt: "React"
            }
        ]
    }
    return (
        <Box sx={{ mt: 10 }}>
            <TopBar />

            <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                الطلاب الجدد
            </Typography>
            <BarChartComponent />
            <StatsCardComponent data={teacherData} />
            <StatsCardComponent data={studentData} />
        </Box>
    )
}