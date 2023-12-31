import * as React from 'react';
import BarChartComponent from '../../Components/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import StatsCardComponent from '../../Components/StatsCard';
import TopBar from "..//Global/TopBar";
import axiosInstance from '../../axios';

export default function Home() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const [teacherData, setTeacherData] = React.useState({
        title: "الشيوخ",
        buttonTitle: "رؤية الكل",
        buttonRoute: "/teachers",
        statsCharts: [
            {
                totalCount: 235,
                subCount: 186,
                totalCountTitle: "كل الشيوخ",
                subCountTitle: "الشيوخ العاملين",
                imageSrc: "../../public/logo192.png",
                imageAlt: "React",
                prop: "workingTeacherRate"
            }
        ]
    })

    const [studentData, setStudentData] = React.useState({
        title: "الطلاب",
        buttonTitle: "رؤية الكل",
        buttonRoute: "/students",
        statsCharts: [
            {
                totalCount: 846,
                subCount: 159,
                totalCountTitle: "كل الطلاب",
                subCountTitle: "طلاب الحلقات",
                imageSrc: "../../public/logo192.png",
                imageAlt: "React",
                prop: "sessionRate"
            },
            // {
            //     totalCount: 846,
            //     subCount: 246,
            //     totalCountTitle: "كل الطلاب",
            //     subCountTitle: "طلاب الإجازات",
            //     imageSrc: "../../public/logo192.png",
            //     imageAlt: "React",
            //     prop: "absenceRate"
            // }
        ]
    })

    const [barChartData, setBarChartData] = React.useState(null)

    const getStudentData = async () => {
        const { data } = await axiosInstance.get('/users/get_all_students')
        const totalabsent = data.filter((d) => d.normalUser?.numberPerWeek >= 1).length
        const totalStudentsInSessions = (await axiosInstance.get('/sessions/sessions_students')).data?.length
        const totalStudents = data.length
        const tmpData = JSON.parse(JSON.stringify(studentData))
        const sessionRateChartIndex = studentData.statsCharts.findIndex((sd) => sd.prop === "sessionRate")
        if (sessionRateChartIndex >= 0) {
            tmpData.statsCharts[sessionRateChartIndex].totalCount = totalStudents
            tmpData.statsCharts[sessionRateChartIndex].subCount = totalStudentsInSessions
        }
        const absenceRateChartIndex = studentData.statsCharts.findIndex((sd) => sd.prop === "absenceRate")
        if (absenceRateChartIndex >= 0) {
            tmpData.statsCharts[absenceRateChartIndex].totalCount = totalStudents
            tmpData.statsCharts[absenceRateChartIndex].subCount = totalabsent
        }

        setStudentData(tmpData)
    }

    const getTeacherData = async () => {
        const { data } = await axiosInstance.get('/users/get_mohafez_users')
        const totalWorkingTeachers = data.filter((d) => d.myEjazaEnum == 1).length
        const totalTeachers = data.length
        const tmpData = JSON.parse(JSON.stringify(teacherData))
        const workingTeacherChartIndex = teacherData.statsCharts.findIndex((td) => td.prop === "workingTeacherRate")
        if (workingTeacherChartIndex >= 0) {
            tmpData.statsCharts[workingTeacherChartIndex].totalCount = totalTeachers
            tmpData.statsCharts[workingTeacherChartIndex].subCount = totalWorkingTeachers
        }
        setTeacherData(tmpData)
    }

    const getUserCountsPerYear = async () => {
        const currentYear = new Date().getFullYear();
        const { data } = await axiosInstance.get(`/admin/user/count/${currentYear}`);
        setBarChartData(data)
    }

    React.useEffect(() => {
        getTeacherData();
        getStudentData();
        getUserCountsPerYear();
    }, [])

    return (
        <Box sx={{ mt: 10, mb: 2 }}>
            <TopBar data={[...studentData,...teacherData]} />

            <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                الطلاب الجدد
            </Typography>
            {(barChartData) && <BarChartComponent data={barChartData} />}
            <StatsCardComponent data={teacherData} />
            <StatsCardComponent data={studentData} />
        </Box>
    )
}