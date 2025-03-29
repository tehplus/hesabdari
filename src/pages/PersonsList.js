import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  ArrowBack,
  MoreVert,
  Edit,
  Delete,
  NoteAdd,
  Refresh,
  FilterList,
  ContentCopy
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali';
import Swal from 'sweetalert2';
import { samplePersons } from '../data/samplePersons';
import './PersonsList.css';

// تابع مرتب‌سازی
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// تعریف ستون‌های جدول
const columns = [
  { id: 'select', label: '', width: 50 },
  { id: 'code', label: 'کد', minWidth: 100 },
  { id: 'category', label: 'دسته بندی', minWidth: 100 },
  { id: 'nickname', label: 'نام مستعار', minWidth: 130 },
  { id: 'company', label: 'شرکت', minWidth: 170 },
  { id: 'country', label: 'کشور', minWidth: 100 },
  { id: 'province', label: 'استان', minWidth: 100 },
  { id: 'city', label: 'شهر', minWidth: 100 },
  { id: 'mobile', label: 'موبایل', minWidth: 120 },
  { id: 'phone', label: 'تلفن', minWidth: 120 },
  { id: 'email', label: 'ایمیل', minWidth: 170, align: 'left' },
  { id: 'nationalId', label: 'شناسه ملی', minWidth: 120 },
  { id: 'economicCode', label: 'کد اقتصادی', minWidth: 120 },
  { id: 'registrationNumber', label: 'شماره ثبت', minWidth: 120 },
  { id: 'isActive', label: 'فعال', width: 80 },
  { id: 'birthDate', label: 'تاریخ تولد', minWidth: 120 },
  { id: 'membershipDate', label: 'تاریخ عضویت', minWidth: 120 }
];

function PersonsList() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('code');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filters, setFilters] = useState({});

  // فیلتر کردن داده‌ها بر اساس تب فعال
  const filteredData = useMemo(() => {
    let data = [...samplePersons];
    
    // اعمال فیلتر تب‌ها
    switch(tab) {
      case 1: // مشتریان
        data = data.filter(person => person.isCustomer);
        break;
      case 2: // تامین کنندگان
        data = data.filter(person => person.isSupplier);
        break;
      case 3: // کارمندان
        data = data.filter(person => person.isEmployee);
        break;
      case 4: // بدون تراکنش
        // اینجا باید منطق فیلتر تراکنش‌ها اضافه شود
        break;
      default:
        break;
    }

    return data;
  }, [tab]);

  // مرتب‌سازی شده و صفحه‌بندی شده
  const visibleRows = useMemo(() => {
    return stableSort(filteredData, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, order, orderBy, page, rowsPerPage]);
  // توابع مدیریت رویدادها
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setPage(0);
    setSelected([]);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(visibleRows.map(row => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null,
    );
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  // توابع عملیاتی
  const handleNew = () => {
    navigate('/persons/new');
  };

  const handleEdit = () => {
    if (selected.length !== 1) {
      Swal.fire({
        icon: 'warning',
        title: 'لطفاً یک مورد را انتخاب کنید',
        text: 'برای ویرایش باید دقیقاً یک مورد انتخاب شود',
        confirmButtonText: 'تایید'
      });
      return;
    }
    navigate(`/persons/edit/${selected[0]}`);
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'لطفاً حداقل یک مورد را انتخاب کنید',
        confirmButtonText: 'تایید'
      });
      return;
    }

    const result = await Swal.fire({
      icon: 'warning',
      title: 'آیا مطمئن هستید؟',
      text: `${selected.length} مورد انتخاب شده حذف خواهد شد`,
      showCancelButton: true,
      confirmButtonText: 'بله، حذف شود',
      cancelButtonText: 'انصراف',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // اینجا عملیات حذف انجام می‌شود
      Swal.fire({
        icon: 'success',
        title: 'عملیات موفق',
        text: `${selected.length} مورد با موفقیت حذف شد`,
        confirmButtonText: 'تایید',
        timer: 2000,
        timerProgressBar: true
      });
      setSelected([]);
    }
  };

  return (
    <Box sx={{ p: 3 }} dir="rtl">
      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
        {/* هدر */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            اشخاص
          </Typography>
          <Tooltip title="بازگشت">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Tooltip title="بیشتر">
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="warning"
            startIcon={<NoteAdd />}
            onClick={handleNew}
          >
            جدید
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleEdit}
            disabled={selected.length !== 1}
          >
            ویرایش
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
            disabled={selected.length === 0}
          >
            حذف
          </Button>
        </Box>

        {/* تب‌ها */}
        <Tabs 
          value={tab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="همه" />
          <Tab label="مشتریان" />
          <Tab label="تامین کنندگان" />
          <Tab label="کارمندان" />
          <Tab label="بدون تراکنش" />
        </Tabs>

        {/* جدول */}
        <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'right'}
                    style={{ minWidth: column.minWidth, width: column.width }}
                  >
                    {column.id === 'select' ? (
                      <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < visibleRows.length}
                        checked={visibleRows.length > 0 && selected.length === visibleRows.length}
                        onChange={handleSelectAllClick}
                      />
                    ) : (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const isSelected = selected.indexOf(row.id) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isSelected} />
                    </TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/persons/${row.id}`);
                        }}
                      >
                        {row.nickname}
                      </Button>
                    </TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.province}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell>{row.nationalId}</TableCell>
                    <TableCell>{row.economicCode}</TableCell>
                    <TableCell>{row.registrationNumber}</TableCell>
                    <TableCell>
                      <Switch
                        checked={row.isActive}
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      {row.birthDate ? moment(row.birthDate).format('jYYYY/jMM/jDD') : ''}
                    </TableCell>
                    <TableCell>
                      {moment(row.membershipDate).format('jYYYY/jMM/jDD')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* پاورقی جدول */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد در صفحه:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} از ${count}`
          }
        />
      </Paper>

      {/* منوی بیشتر */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <FilterList sx={{ mr: 1 }} />
          حذف فیلتر
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ContentCopy sx={{ mr: 1 }} />
          کپی
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Refresh sx={{ mr: 1 }} />
          بازسازی قالب
        </MenuItem>
      </Menu>

      {/* منوی راست کلیک */}
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleContextMenuClose}>حذف فیلتر</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>انتخابگر ستون‌ها</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>بازسازی قالب</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>نتیجه</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>انتخاب</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>کپی</MenuItem>
      </Menu>
    </Box>
  );
}

export default PersonsList;