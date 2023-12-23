import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const studentData = [0, 50, 10, 60, 80, 100];
const teacherData = [10, 30, 0, 50, 70, 90];
const xLabels = [
    'نوفمبر 2022',
    'ديسمبر 2022',
    'يناير 2023',
    'فبراير 2023',
    'مارس 2023',
    'ابريل 2023'
];

const StyledBarChart = styled('div')(({ theme, colors }) => ({
    'svg':{
        width:'100%',
        minHeight:'300px'
    },
    '.MuiChartsLegend-mark': {
        rx: "50px",
        marging: "10px"
    },
    '.MuiChartsLegend-series text': {
        translate: "-30px"
    },
    '.MuiChartsAxis-directionY .MuiChartsAxis-tickContainer text':{
        translate: "30px"
    },
    '.MuiChartsLegend-row':{
        translate: "40%"
    }
}));

export default function BarChartComponent() {
    const DEFAULT_Y_AXIS_KEY = 'rightAxisId';
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

    const [width, setWidth] = React.useState(window.innerWidth);

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    const valueFormatter = (value) => `${value} %`

    return (
        <Box sx={{ flexGrow: 1}}>
            <StyledBarChart colors={colors}>
                <BarChart
                    width={width}
                    height={300}
                    series={[
                        { data: teacherData, label: 'الطلاب الذكور', id: 'teacherId', yAxisKey: DEFAULT_Y_AXIS_KEY, color: colors.orangeAccent[100] },
                        { data: studentData, label: 'الطالبات الإناث', id: 'studentId', yAxisKey: DEFAULT_Y_AXIS_KEY, color: colors.primary[500] },
                    ]}
                    xAxis={[{
                        data: xLabels,
                        scaleType: 'band',
                        categoryGapRatio: 0.5,
                        barGapRatio: 0.2
                    }]}
                    leftAxis={null}
                    yAxis={[{ id: 'rightAxisId',valueFormatter }]}
                    rightAxis={DEFAULT_Y_AXIS_KEY}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fontSize: 12
                            },
                        },
                    }}
                />
            </StyledBarChart>
        </Box>
    );
}