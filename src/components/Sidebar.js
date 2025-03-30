import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  Divider 
} from '@mui/material';
import {
  Dashboard,
  People,
  Store,
  AccountBalance,
  ShoppingCart,
  LocalShipping,
  Inventory,
  ReceiptLong,
  Assessment,
  Settings,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState('');

  // پیدا کردن منوی والد برای مسیر فعلی
  const findParentMenu = (currentPath) => {
    for (const item of menuItems) {
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.link === currentPath);
        if (subItem) {
          return item.text;
        }
      }
    }
    return '';
  };

  // باز کردن منوی مربوط به صفحه فعلی به صورت خودکار
  useEffect(() => {
    const parentMenu = findParentMenu(location.pathname);
    if (parentMenu) {
      setOpenMenu(parentMenu);
    }
  }, [location.pathname]);

  const handleClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

    const menuItems = [
    { text: 'داشبورد', icon: <Dashboard />, link: '/' },
    { 
      text: 'اشخاص', 
      icon: <People />, 
      subItems: [
        { text: 'شخص جدید', link: '/new-person' },
        { text: 'اشخاص', link: '/persons-list' },
        { text: 'دریافت', link: '/receipts' },
        { text: 'لیست دریافت ها', link: '/receipts-list' },
        { text: 'پرداخت', link: '/payments' },
        { text: 'لیست پرداخت ها', link: '/payments-list' },
        { text: 'سهامداران', link: '/shareholders' },
        { text: 'فروشندگان', link: '/vendors' }
      ] 
    },
    { 
      text: 'کالاها و خدمات', 
      icon: <Store />, 
      subItems: [
        { text: 'کالای جدید', link: '/new-product' },
        { text: 'خدمات جدید', link: '/new-service' },
        { text: 'کالاها و خدمات', link: '/products-services' },
        { text: 'به روز رسانی لیست قیمت', link: '/update-prices' },
        { text: 'چاپ بارکد', link: '/print-barcode' },
        { text: 'چاپ بارکد تعدادی', link: '/print-multiple-barcodes' },
        { text: 'صفحه لیست قیمت کالا', link: '/price-list' }
      ] 
    },
    { 
      text: 'بانکداری', 
      icon: <AccountBalance />, 
      subItems: [
        { text: 'بانک‌ها', link: '/banks' },
        { text: 'صندوق‌ها', link: '/cash-boxes' },
        { text: 'تنخواه‌گردان‌ها', link: '/petty-cash' },
        { text: 'انتقال', link: '/transfer' },
        { text: 'لیست انتقال‌ها', link: '/transfers-list' },
        { text: 'لیست چک‌های دریافتی', link: '/received-checks' },
        { text: 'لیست چک‌های پرداختی', link: '/paid-checks' }
      ] 
    },
    { 
      text: 'فروش و درآمد', 
      icon: <ShoppingCart />, 
      subItems: [
        { text: 'فروش جدید', link: '/new-sale' },
        { text: 'فاکتور سریع', link: '/quick-invoice' },
        { text: 'برگشت از فروش', link: '/sales-return' },
        { text: 'فاکتورهای فروش', link: '/sales-invoices' },
        { text: 'فاکتورهای برگشت از فروش', link: '/sales-return-invoices' },
        { text: 'درآمد', link: '/income' },
        { text: 'لیست درآمدها', link: '/income-list' },
        { text: 'قرارداد فروش اقساطی', link: '/installment-sale' },
        { text: 'لیست فروش اقساطی', link: '/installment-sales-list' },
        { text: 'اقلام تخفیف دار', link: '/discounted-items' }
      ] 
    },
    { 
      text: 'خرید و هزینه', 
      icon: <LocalShipping />, 
      subItems: [
        { text: 'خرید جدید', link: '/new-purchase' },
        { text: 'برگشت از خرید', link: '/purchase-return' },
        { text: 'فاکتورهای خرید', link: '/purchase-invoices' },
        { text: 'فاکتورهای برگشت از خرید', link: '/purchase-return-invoices' },
        { text: 'هزینه', link: '/expense' },
        { text: 'لیست هزینه‌ها', link: '/expense-list' },
        { text: 'ضایعات', link: '/waste' },
        { text: 'لیست ضایعات', link: '/waste-list' }
      ] 
    },
    { 
      text: 'انبارداری', 
      icon: <Inventory />, 
      subItems: [
        { text: 'انبارها', link: '/warehouses' },
        { text: 'حواله جدید', link: '/new-voucher' },
        { text: 'رسید و حواله‌های انبار', link: '/warehouse-vouchers' },
        { text: 'موجودی کالا', link: '/inventory' },
        { text: 'موجودی تمامی انبارها', link: '/all-warehouses-inventory' },
        { text: 'انبارگردانی', link: '/stock-taking' }
      ] 
    },
    { 
      text: 'حسابداری', 
      icon: <AccountBalance />, 
      subItems: [
        { text: 'سند جدید', link: '/new-document' },
        { text: 'لیست اسناد', link: '/documents-list' },
        { text: 'تراز افتتاحیه', link: '/opening-balance' },
        { text: 'بستن سال مالی', link: '/close-fiscal-year' },
        { text: 'جدول حساب‌ها', link: '/chart-of-accounts' },
        { text: 'تجمیع اسناد', link: '/merge-documents' }
      ] 
    },
    { 
      text: 'سایر', 
      icon: <ReceiptLong />, 
      subItems: [
        { text: 'آرشیو', link: '/archive' },
        { text: 'پنل پیامک', link: '/sms-panel' },
        { text: 'استعلام', link: '/inquiry' },
        { text: 'دریافت سایر', link: '/other-receipts' },
        { text: 'لیست دریافت‌ها', link: '/other-receipts-list' },
        { text: 'پرداخت سایر', link: '/other-payments' },
        { text: 'لیست پرداخت‌ها', link: '/other-payments-list' },
        { text: 'سند تسعیر ارز', link: '/currency-exchange-doc' },
        { text: 'سند توازن اشخاص', link: '/persons-balance-doc' },
        { text: 'سند توازن کالاها', link: '/products-balance-doc' },
        { text: 'سند حقوق', link: '/salary-doc' }
      ] 
    },
    { 
      text: 'گزارش‌ها', 
      icon: <Assessment />, 
      subItems: [
        { text: 'تمام گزارش‌ها', link: '/all-reports' },
        { text: 'ترازنامه', link: '/balance-sheet' },
        { text: 'بدهکاران و بستانکاران', link: '/debtors-creditors' },
        { text: 'کارت حساب اشخاص', link: '/persons-account-card' },
        { text: 'کارت حساب کالا', link: '/product-account-card' },
        { text: 'فروش به تفکیک کالا', link: '/sales-by-product' },
        { text: 'کارت پروژه', link: '/project-card' }
      ] 
    },
    { 
      text: 'تنظیمات', 
      icon: <Settings />, 
      subItems: [
        { text: 'پروژه‌ها', link: '/projects' },
        { text: 'اطلاعات کسب و کار', link: '/business-info' },
        { text: 'تنظیمات مالی', link: '/financial-settings' },
        { text: 'جدول تبدیل نرخ ارز', link: '/currency-exchange-rates' },
        { text: 'مدیریت کاربران', link: '/users-management' },
        { text: 'تنظیمات چاپ', link: '/print-settings' },
        { text: 'فرم ساز', link: '/form-builder' },
        { text: 'اعلانات', link: '/notifications' }
      ] 
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>حسابینو</h2>
      </div>
      <Divider />
      <List component="nav" sx={{ width: '100%', maxWidth: 360 }}>
        {menuItems.map((item) => (
          <div key={item.text}>
            {item.link ? (
              <ListItemButton
                component={Link}
                to={item.link}
                selected={location.pathname === item.link}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 152, 0, 0.2)',
                    }
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton 
                onClick={() => handleClick(item.text)}
                selected={openMenu === item.text}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 152, 0, 0.2)',
                    }
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems && (openMenu === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            )}
            {item.subItems && (
              <Collapse in={openMenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" sx={{ pl: 4 }}>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      component={Link}
                      to={subItem.link}
                      selected={location.pathname === subItem.link}
                      sx={{
                        pl: 4,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255, 152, 0, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 152, 0, 0.2)',
                          }
                        }
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;