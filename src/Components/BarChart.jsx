import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
const YEAR = new Date().getFullYear();
const ARABIC_MONTHS = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
]
const StyledBarChart = styled('div')(({ theme, colors }) => ({
    'svg': {
        width: '100%',
        minHeight: '300px'
    },
    '.MuiChartsLegend-mark': {
        rx: "50px",
        marging: "10px"
    },
    '.MuiChartsLegend-series text': {
        translate: "-30px"
    },
    '.MuiChartsAxis-directionY .MuiChartsAxis-tickContainer text': {
        translate: "30px"
    },
    '.MuiChartsLegend-row': {
        translate: "40%"
    }
}));

export default function BarChartComponent({ data }) {
    const DEFAULT_Y_AXIS_KEY = 'rightAxisId';
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);


    const monthHashmap = {}
    _.forEach((data?.maleCountByMonth || []), (value, index) => {
        if (value.month) {
            if (!monthHashmap[value.month]) monthHashmap[value.month] = {}
            monthHashmap[value.month]['male'] = value.count
            if (!monthHashmap[value.month].female)
                monthHashmap[value.month]['female'] = 0
        }
    })
    _.forEach((data?.femaleCountByMonth || []), (value, index) => {
        if (value.month) {
            if (!monthHashmap[value.month]) monthHashmap[value.month] = {}
            monthHashmap[value.month]['female'] = value.count
            if (!monthHashmap[value.month].male)
                monthHashmap[value.month]['male'] = 0
        }
    })

    let maleStudentData = [];
    let femaleStudentData = [];
    _.forEach(monthHashmap, (value, key) => {
        femaleStudentData.push(value.female)
        maleStudentData.push(value.male)
    })
    maleStudentData = _.reverse(maleStudentData)
    femaleStudentData = _.reverse(femaleStudentData)
    const xLabels = _.reverse(_.map(_.keys(monthHashmap), (monthNumber) => `${ARABIC_MONTHS[monthNumber - 1]} ${YEAR}`))

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
        <Box sx={{ flexGrow: 1 }}>
            <StyledBarChart colors={colors}>
                <BarChart
                    width={width}
                    height={300}
                    series={[
                        { data: femaleStudentData, label: 'الطلاب الذكور', id: 'teacherId', yAxisKey: DEFAULT_Y_AXIS_KEY, color: colors.orangeAccent[100] },
                        { data: maleStudentData, label: 'الطالبات الإناث', id: 'studentId', yAxisKey: DEFAULT_Y_AXIS_KEY, color: colors.primary[500] },
                    ]}
                    xAxis={[{
                        data: xLabels,
                        scaleType: 'band',
                        categoryGapRatio: 0.5,
                        barGapRatio: 0.2
                    }]}
                    leftAxis={null}
                    yAxis={[{ id: 'rightAxisId', valueFormatter }]}
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