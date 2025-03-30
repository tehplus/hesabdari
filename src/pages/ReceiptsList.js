import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  Popover
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
import DataGrid, {
  Column,
  Selection,
  FilterRow,
  HeaderFilter,
  Sorting,
  Paging,
  Pager,
  Export,
  ColumnChooser
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.orange.light.css';
import './ReceiptsList.css';

function ReceiptsList({ receipts, persons }) {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  // تنظیمات DataGrid
  const dataGridOptions = {
    rtlEnabled: true,
    showBorders: true,
    columnAutoWidth: true,
    allowColumnResizing: true,
    rowAlternationEnabled: true,
    hoverStateEnabled: true
  };

  // تنظیمات Pager
  const pagerOptions = {
    showPageSizeSelector: true,
    allowedPageSizes: [5, 10, 20, 50, 100],
    showInfo: true
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleSelectionChanged = (e) => {
    setSelectedRowKeys(e.selectedRowKeys);
  };

  const handleExportToExcel = () => {
    // پیاده‌سازی خروجی اکسل
    console.log('Exporting to Excel...');
  };

  const handlePrint = () => {
    // پیاده‌سازی چاپ
    console.log('Printing...');
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) return;
    // پیاده‌سازی حذف
    console.log('Deleting items:', selectedRowKeys);
  };

  const formatCurrency = (data) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR'
    }).format(data.value);
  };

  const formatDate = (data) => {
    return new Date(data.value).toLocaleDateString('fa-IR');
  };

  return (
    <Box className="receipts-list">
      {/* هدر */}
      <Box className="page-header">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ mx: 2 }}>
          لیست دریافت‌ها
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleMoreClick}>
          <MoreVert />
        </IconButton>
        <Button
          variant="contained"
          color="warning"
          startIcon={<Visibility />}
          sx={{ mx: 1 }}
        >
          نمایش
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<NoteAdd />}
          onClick={() => navigate('/receipts')}
          sx={{ mx: 1 }}
        >
          جدید
        </Button>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          disabled={selectedRowKeys.length !== 1}
          sx={{ mx: 1 }}
        >
          ویرایش
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          disabled={selectedRowKeys.length === 0}
          onClick={handleDelete}
        >
          حذف
        </Button>
      </Box>

      {/* تب‌ها */}
      <Tabs value={currentTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="همه" />
        <Tab label="آیتم‌ها" />
      </Tabs>

      {/* جدول */}
      <DataGrid
        {...dataGridOptions}
        dataSource={receipts}
        onSelectionChanged={handleSelectionChanged}
        selectedRowKeys={selectedRowKeys}
      >
        <Selection mode="multiple" showCheckBoxesMode="always" />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <Sorting mode="multiple" />
        <Paging defaultPageSize={10} />
        <Pager {...pagerOptions} />
        <Export enabled={true} />
        <ColumnChooser enabled={true} />

        <Column type="selection" />
        <Column
          dataField="id"
          caption="شماره"
          cellRender={({ data }) => (
            <Button
              variant="text"
              onClick={() => navigate(`/receipts/${data.id}`)}
            >
              {data.id}
            </Button>
          )}
        />
        <Column
          dataField="person"
          caption="شخص"
          lookup={{
            dataSource: persons,
            valueExpr: 'id',
            displayExpr: 'name'
          }}
        />
        <Column
          dataField="amount"
          caption="مبلغ"
          dataType="number"
          format="currency"
          customizeText={formatCurrency}
        />
        <Column
          dataField="date"
          caption="تاریخ"
          dataType="date"
          customizeText={formatDate}
        />
        <Column dataField="description" caption="شرح" />
        <Column dataField="project" caption="پروژه" />
      </DataGrid>

      {/* منوی بیشتر */}
      <Menu
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl)}
        onClose={handleMoreClose}
      >
        <MenuItem onClick={() => { handleMoreClose(); }}>
          <FileCopy sx={{ mr: 1 }} /> کپی
        </MenuItem>
        <MenuItem onClick={() => { handleMoreClose(); handlePrint(); }}>
          <Print sx={{ mr: 1 }} /> چاپ
        </MenuItem>
        <MenuItem onClick={() => { handleMoreClose(); handleExportToExcel(); }}>
          <GetApp sx={{ mr: 1 }} /> خروجی اکسل
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ReceiptsList;