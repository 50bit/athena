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
        title: "الشيوخ",
        values: [
            'عامل',
            'غير عامل'
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

export default function Teachers() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = React.useContext(ColorModeContext);

    const [teacherData, setTeacherData] = React.useState([])
    const [filteredTeacherData, setFilteredTeacherData] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [teacherGraphData, setTeacherGraphData] = React.useState({
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
        ],
        images:[]
    })



    const getTeacherData = async () => {
        const { data } = await axiosInstance.get('/users/get_mohafez_users')
        const totalWorkingTeachers = data.filter((d) => d.getPaid == true).length
        const totalTeachers = data.length
        const tmpData = JSON.parse(JSON.stringify(teacherGraphData))
        const images = _.map(data,(d)=>d.imagePath)
        tmpData['images'] = images
        const workingTeacherChartIndex = teacherGraphData.statsCharts.findIndex((td) => td.prop === "workingTeacherRate")
        if (workingTeacherChartIndex >= 0) {
            tmpData.statsCharts[workingTeacherChartIndex].totalCount = totalTeachers
            tmpData.statsCharts[workingTeacherChartIndex].subCount = totalWorkingTeachers
        }
        setTeacherGraphData(tmpData);
        setTeacherData(data);
        setFilteredTeacherData(data);

        if (selectedItems.length > 0)
            filterData()
    }

    const filterData = () => {
        if (selectedItems.length === 0)
            setFilteredTeacherData(teacherData)
        const genderFilters = _.join(_.map(_.filter(selectedItems, (item) => item === "الذكور" || item === "الإناث"), (gItem) => {
            if (gItem === "الذكور")
                return 'td.gender === "male"'
            else if (gItem === "الإناث")
                return 'td.gender === "female"'
        }), " || ")
        const paidFilters = _.join(_.map(_.filter(selectedItems, (item) => item === "عامل" || item === "غير عامل"), (pItem) => {
            if (pItem === "عامل")
                return 'td.getPaid == true'
            else if (pItem === "غير عامل")
                return 'td.getPaid == false'
        }), " || ")

        let filterCondition = _.join(_.map(_.filter([genderFilters, paidFilters], (item) => !_.isEmpty(item)), (filteredItem) => `(${filteredItem})`), ' && ');

        if (!_.isEmpty(filterCondition))
            setFilteredTeacherData(_.uniqBy(_.filter(teacherData, (td) => eval(filterCondition)), 'uId'))
    }

    React.useEffect(() => {
        getTeacherData();
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
            <TopBar data={[teacherData]} />
            <StatsCardComponent data={teacherGraphData} />
            <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
            <Grid container rowSpacing={1} pl={2} pr={2} alignItems={'center'}>
                <Grid item xs={6}>
                    <Typography variant="h4" sx={{ pr: 1, color: colors.primary[500], fontWeight: 'bold' }}>
                        كل الشيوخ
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
            {filteredTeacherData.map((teacher) => {
                return (
                    <div style={{ cursor: 'pointer' }} onClick={() => gotoInfoCard(teacher)}>
                        <InfoCard infoCardData={teacher} />
                    </div>
                )
            })}
        </Box>
    )
}