import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ReceiptsList.css';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Typography,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Tooltip
} from '@mui/material';
import {
  ArrowBack,
  MoreVert,
  Visibility,
  NoteAdd,
  Edit,
  Delete,
  FileCopy,
  Print,
  GetApp
} from '@mui/icons-material';

function ReceiptsList({ receipts, persons }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  // مدیریت مرتب‌سازی
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // مرتب‌سازی داده‌ها
  const sortedReceipts = receipts.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return b[orderBy] < a[orderBy] ? -1 : 1;
    }
  });

  // مدیریت انتخاب سطرها
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(receipts.map(n => n.id));
      return;
    }
    setSelected([]);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR'
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* هدر */}
        <Toolbar sx={{ px: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>
              لیست دریافت‌ها
            </Typography>
          </Box>
          
          <Box>
            <IconButton onClick={(e) => setMoreAnchorEl(e.currentTarget)}>
              <MoreVert />
            </IconButton>
            <Button
              startIcon={<Visibility />}
              variant="contained"
              color="warning"
              sx={{ mx: 1 }}
            >
              نمایش
            </Button>
            <Button
              startIcon={<NoteAdd />}
              variant="contained"
              color="success"
              onClick={() => navigate('/receipts')}
              sx={{ mx: 1 }}
            >
              جدید
            </Button>
            <Button
              startIcon={<Edit />}
              variant="outlined"
              disabled={selected.length !== 1}
              sx={{ mx: 1 }}
            >
              ویرایش
            </Button>
            <Button
              startIcon={<Delete />}
              variant="contained"
              color="error"
              disabled={selected.length === 0}
            >
              حذف
            </Button>
          </Box>
        </Toolbar>

        {/* تب‌ها */}
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="همه" />
          <Tab label="آیتم‌ها" />
        </Tabs>

        {/* جدول */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < receipts.length}
                    checked={receipts.length > 0 && selected.length === receipts.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={() => handleRequestSort('id')}
                  >
                    شماره
                  </TableSortLabel>
                </TableCell>
                <TableCell>شخص</TableCell>
                <TableCell>مبلغ</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>شرح</TableCell>
                <TableCell>پروژه</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedReceipts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((receipt) => {
                  const isItemSelected = isSelected(receipt.id);
                  const person = persons.find(p => p.id === receipt.person);

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(receipt.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={receipt.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell>{receipt.id}</TableCell>
                      <TableCell>{person?.name || '-'}</TableCell>
                      <TableCell>{formatCurrency(receipt.amount)}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.description || '-'}</TableCell>
                      <TableCell>{receipt.project || '-'}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* پاجینیشن */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={receipts.length}
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
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl)}
        onClose={() => setMoreAnchorEl(null)}
      >
        <MenuItem onClick={() => setMoreAnchorEl(null)}>
          <FileCopy sx={{ mr: 1 }} /> کپی
        </MenuItem>
        <MenuItem onClick={() => setMoreAnchorEl(null)}>
          <Print sx={{ mr: 1 }} /> چاپ
        </MenuItem>
        <MenuItem onClick={() => setMoreAnchorEl(null)}>
          <GetApp sx={{ mr: 1 }} /> خروجی اکسل
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ReceiptsList;