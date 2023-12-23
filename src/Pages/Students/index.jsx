import * as React from 'react';
import BarChartComponent from '../../Components/BarChart'
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
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InfoCard from '../../Components/InfoCard'

const options = [
    {
        title: "الطلاب",
        values: [
            'الطلاب',
            'طلاب الحلقات',
            'طلاب الإجازات'
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedItems, setSelectedItems] = React.useState([]);
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
    return (
        <Box sx={{ mt: 10, mb: 2 }}>
            <TopBar />
            <StatsCardComponent data={studentData} />
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
                        <Typography variant="h4" sx={{ cursor:'pointer', fontSize: 14, color: colors.primary[600], textDecoration: 'none', fontWeight: 'bold', m: '10px 15px', float:'left' }} onClick={clearFilter}>
                            حذف التنقية
                        </Typography>
                    </Menu>
                </Grid>
            </Grid>
            <InfoCard data={{}}/>
        </Box>
    )
}