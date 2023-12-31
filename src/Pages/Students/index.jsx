import * as React from 'react';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import Chip from '@mui/material/Chip';
import InfoCard from '../../Components/InfoCard';
import axiosInstance from '../../axios';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const options = [
    {
        title: "الطلاب",
        values: [
            'الطلاب',
            'طلاب الحلقات',
            // 'طلاب الإجازات'
        ]
    },
    {
        title: "النوع",
        values: [
            'الذكور',
            'الإناث'
        ]
    }
];

export default function Students() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);
    const [studentData, setStudentData] = React.useState([])
    const [filteredStudentData, setFilteredStudentData] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [studentGraphData, setStudentGraphData] = React.useState({
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
                imageAlt: "React",
                prop: "sessionRate"
            },
            // {
            //     totalCount: 846,
            //     subCount: 246,
            //     totalCountTitle: "كل الطلاب",
            //     subCountTitle: "طلاب الإجازات",
            //     imageSrc: "../../public/logo192.png",
            //     imageAlt: "React"
            // }
        ]
    })



    const getStudentData = async () => {
        const { data } = await axiosInstance.get('/users/get_all_students');
        const sessionStudents = (await axiosInstance.get('/sessions/sessions_students')).data
        _.forEach(data, (sd) => {
            const sessionStudent = _.find(sessionStudents, (ss) => ss.student?.id === sd.id)
            if (!_.isEmpty(sessionStudent))
                sd['sessionStudent'] = true
            else
                sd['sessionStudent'] = false
        })
        const totalStudents = data.length || 0
        const tmpData = JSON.parse(JSON.stringify(studentGraphData))
        const sessionChartIndex = studentGraphData.statsCharts.findIndex((sd) => sd.prop === "sessionRate")
        if (sessionChartIndex >= 0) {
            tmpData.statsCharts[sessionChartIndex].totalCount = totalStudents
            tmpData.statsCharts[sessionChartIndex].subCount = sessionStudents?.length || 0
        }
        setStudentGraphData(tmpData);
        setStudentData(data);
        setFilteredStudentData(data);

        if (selectedItems.length > 0)
            filterData()
    }

    const filterData = () => {
        if (selectedItems.length === 0)
            setFilteredStudentData(studentData)
        const genderFilters = _.join(_.map(_.filter(selectedItems, (item) => item === "الذكور" || item === "الإناث"), (gItem) => {
            if (gItem === "الذكور")
                return 'sd.gender === "male"'
            else if (gItem === "الإناث")
                return 'sd.gender === "female"'
        }), " || ")
        const paidFilters = _.join(_.map(_.filter(selectedItems, (item) => item === "الطلاب" || item === "طلاب الحلقات"), (sItem) => {
            if (sItem === "الطلاب")
                return '(sd.sessionStudent == true || sd.sessionStudent == false)'
            else if (sItem === "طلاب الحلقات")
                return 'sd.sessionStudent == true'
        }), " || ")

        let filterCondition = _.join(_.map(_.filter([genderFilters, paidFilters], (item) => !_.isEmpty(item)), (filteredItem) => `(${filteredItem})`), ' && ');
        if (!_.isEmpty(filterCondition))
            setFilteredStudentData(_.uniqBy(_.filter(studentData, (sd) => eval(filterCondition)), 'id'))
    }

    React.useEffect(() => {
        getStudentData();
    }, [])

    React.useEffect(() => {
        filterData()
    }, [JSON.stringify(selectedItems)])

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const selectOption = (value) => {
        if (!selectedItems.includes(value))
            setSelectedItems([...selectedItems, value])
        else {
            const itemIndex = selectedItems.findIndex((item) => item === value)
            if (itemIndex >= 0) {
                let items = selectedItems
                items.splice(itemIndex, 1)
                setSelectedItems([...items])
            }
        }
    }
    const isSelected = (value) => {
        return selectedItems.includes(value)
    }
    const clearFilter = () => {
        setSelectedItems([])
    }

    const navigate = useNavigate();

    const gotoInfoCard = (data) => {
        navigate('/user', {
            state: data
        })
    }
    return (
        <Box sx={{ mt: 10, mb: 2 }}>
            <TopBar data={[studentData]} />
            <StatsCardComponent data={studentGraphData} />
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Grid container rowSpacing={1} pl={2} pr={2} alignItems={'center'}>
                <Grid item xs={6}>
                    <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                        كل الطلاب
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'end', mt: 0, pt: 0 }}>
                    <IconButton
                        aria-label="filter"
                        id="filter-button"
                        aria-controls={open ? 'filter-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        sx={{ textAlign: 'end', mt: 0 }}
                    >
                        <FilterListIcon />
                    </IconButton>
                    <Menu
                        id="filter-menu"
                        MenuListProps={{
                            'aria-labelledby': 'filter-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{ direction: "rtl" }}
                    >
                        {options.map((option, parentIndex) => (
                            <Grid key={parentIndex} container rowSpacing={1} pl={2} pr={2} mt={1} alignItems={'center'}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                                        {option.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {option?.values.map((value, childIndex) => (
                                        <Chip key={`${parentIndex}.${childIndex}`} sx={{ m: "10px 2px", color: colors.primary[500] }} label={value} color={isSelected(value) ? 'warning' : 'default'} variant={isSelected(value) ? 'outlined' : 'filled'} onClick={() => selectOption(value)} />
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                        <Typography variant="h4" sx={{ cursor: 'pointer', fontSize: 14, color: colors.primary[600], textDecoration: 'none', fontWeight: 'bold', m: '10px 15px', float: 'left' }} onClick={clearFilter}>
                            حذف التنقية
                        </Typography>
                    </Menu>
                </Grid>
            </Grid>
            {filteredStudentData.map((student) => {
                return (
                    <div style={{ cursor: 'pointer' }} onClick={() => gotoInfoCard(student)}>
                        <InfoCard infoCardData={student} />
                    </div>
                )
            })}
        </Box>
    )
}