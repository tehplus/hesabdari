import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  MenuItem,
  FormGroup,
  Divider,
  InputAdornment,
  Alert,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
  Zoom,
  Card,
  CardContent,
  Autocomplete,
  Snackbar
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import {
  PhotoCamera,
  Delete,
  Save,
  Cancel,
  AccountCircle,
  Business,
  Phone,
  Email,
  LocationOn,
  AccountBalance,
  Event,
  InfoOutlined,
  AddCircleOutline
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali';
import '../assets/css/NewPerson.css';

// تنظیم moment-jalaali
moment.loadPersian({ usePersianDigits: true });

// لیست‌های ثابت
const provinces = ['تهران', 'اصفهان', 'مشهد', 'شیراز', 'تبریز'];
const banks = ['ملت', 'ملی', 'صادرات', 'پارسیان', 'سامان', 'پاسارگاد'];

function NewPerson() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // State های اصلی
  const [currentTab, setCurrentTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bank: '', accountNumber: '', cardNumber: '', sheba: '' }
  ]);

  // State اصلی فرم
  const [formData, setFormData] = useState({
    code: '',
    company: '',
    title: '',
    firstName: '',
    lastName: '',
    nickname: '',
    nationalId: '',
    economicCode: '',
    registrationNumber: '',
    address: '',
    country: 'ایران',
    province: '',
    city: '',
    postalCode: '',
    phone: '',
    mobile: '',
    fax: '',
    email: '',
    website: '',
    description: '',
    creditLimit: '',
    isActive: true,
    category: '',
    isCustomer: false,
    isSupplier: false,
    isEmployee: false,
    isShareholder: false,
    debit: '',
    credit: '',
    balance: '0',
    bankAccount1: '',
    bankAccount2: '',
    bankAccount3: '',
    openingDebit: '',
    openingCredit: '',
    taxType: '5',
    priceList: '',
    branchCode: '',
    birthDate: null,
    marriageDate: null,
    membershipDate: moment('2025-03-29'),
    phone1: '',
    phone2: '',
    phone3: '',
    image: null
  });

  // توابع اعتبارسنجی
  const validateEmail = (email) => {
    return email ? /\S+@\S+\.\S+/.test(email) : true;
  };
// تابع نمایش پیام موفقیت
const showSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'موفقیت',
    text: message,
    confirmButtonText: 'تایید',
    timer: 3000,
    timerProgressBar: true
  });
  };
  // تابع نمایش خطا
const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'خطا',
    text: message,
    confirmButtonText: 'تایید'
  });
  };
  // تابع نمایش تایید حذف
const confirmDelete = async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'آیا مطمئن هستید؟',
    text: 'این عملیات قابل بازگشت نیست',
    showCancelButton: true,
    confirmButtonText: 'بله، حذف شود',
    cancelButtonText: 'انصراف',
    reverseButtons: true
  });

  return result.isConfirmed;
};
  const validateNationalId = (id) => {
    return id ? /^\d{10}$/.test(id) : true;
  };

  const validateSheba = (sheba) => {
    return sheba ? /^IR\d{24}$/.test(sheba) : true;
  };

  const validateCardNumber = (card) => {
    return card ? /^\d{16}$/.test(card) : true;
  };

  // تابع اعتبارسنجی فرم
  const validateForm = () => {
    const newErrors = {};
    
    // فیلدهای اجباری
    if (!formData.code) newErrors.code = 'کد حسابداری اجباری است';
    if (!formData.firstName) newErrors.firstName = 'نام اجباری است';
    if (!formData.lastName) newErrors.lastName = 'نام خانوادگی اجباری است';

    // اعتبارسنجی فرمت‌ها
    if (!validateEmail(formData.email)) {
      newErrors.email = 'فرمت ایمیل نامعتبر است';
    }
    if (!validateNationalId(formData.nationalId)) {
      newErrors.nationalId = 'کد ملی باید 10 رقم باشد';
    }

    // اعتبارسنجی حساب‌های بانکی
    bankAccounts.forEach((account, index) => {
      if (account.bank && !account.accountNumber) {
        newErrors[`bankAccount${index}`] = 'شماره حساب اجباری است';
      }
      if (account.sheba && !validateSheba(account.sheba)) {
        newErrors[`sheba${index}`] = 'فرمت شبا نامعتبر است';
      }
      if (account.cardNumber && !validateCardNumber(account.cardNumber)) {
        newErrors[`cardNumber${index}`] = 'شماره کارت باید 16 رقم باشد';
      }
    });

    return newErrors;
  };

  // تابع ذخیره فرم
const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  setError('');
  setErrors({});

  // اعتبارسنجی فرم
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    setLoading(false);
    return;
  }

  try {
    const finalData = {
      ...formData,
      bankAccounts: bankAccounts,
      createdAt: "2025-03-29 21:16:11", // تاریخ و زمان فعلی
      createdBy: "tehplus" // نام کاربر فعلی
    };

    // در اینجا باید به API ارسال شود
    console.log('Form Data:', finalData);
    
    await Swal.fire({
      icon: 'success',
      title: 'موفقیت',
      text: 'اطلاعات با موفقیت ذخیره شد',
      confirmButtonText: 'تایید',
      timer: 3000,
      timerProgressBar: true
    });
    
    navigate('/persons');
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'خطا',
      text: 'خطا در ذخیره اطلاعات: ' + err.message,
      confirmButtonText: 'تایید'
    });
  } finally {
    setLoading(false);
  }
};

  // تابع مدیریت حساب‌های بانکی
  const handleBankAccountChange = (id, field, value) => {
    setBankAccounts(prev => 
      prev.map(account => 
        account.id === id 
          ? { ...account, [field]: value }
          : account
      )
    );
  };

  // تابع اضافه کردن حساب بانکی
  const handleAddBankAccount = () => {
    setBankAccounts(prev => [...prev, {
      id: prev.length + 1,
      bank: '',
      accountNumber: '',
      cardNumber: '',
      sheba: ''
    }]);
  };

  // تابع حذف حساب بانکی
 const handleRemoveBankAccount = async (id) => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'آیا مطمئن هستید؟',
    text: 'این عملیات قابل بازگشت نیست',
    showCancelButton: true,
    confirmButtonText: 'بله، حذف شود',
    cancelButtonText: 'انصراف',
    reverseButtons: true
  });

  if (result.isConfirmed) {
    setBankAccounts(prev => prev.filter(account => account.id !== id));
    await Swal.fire({
      icon: 'success',
      title: 'موفقیت',
      text: 'حساب بانکی با موفقیت حذف شد',
      confirmButtonText: 'تایید',
      timer: 2000,
      timerProgressBar: true
    });
  }
};

  // تابع تغییر تب
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // تابع آپلود تصویر
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // تابع حذف تصویر
  const handleImageDelete = () => {
    setPreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  // تابع عمومی تغییر فیلدها
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // تابع تغییر تاریخ
  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // شروع بخش JSX
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box dir="rtl" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* هدر فرم */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <div className="avatar-upload">
              <Avatar
                src={preview}
                sx={{ width: 100, height: 100, cursor: 'pointer' }}
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
              />
              {preview && (
                <IconButton
                  size="small"
                  onClick={handleImageDelete}
                  sx={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <Delete />
                </IconButton>
              )}
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                ثبت شخص جدید
              </Typography>
              <Typography variant="body2" color="textSecondary">
                تاریخ ثبت: {moment("2025-03-29 20:30:38").format('jYYYY/jMM/jDD HH:mm:ss')}
              </Typography>
            </div>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* تب‌ها */}
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2 }}
              >
                <Tab label="اطلاعات عمومی" value="1" icon={<AccountCircle />} iconPosition="start" />
                <Tab label="اطلاعات مالی" value="2" icon={<Business />} iconPosition="start" />
                <Tab label="آدرس" value="3" icon={<LocationOn />} iconPosition="start" />
                <Tab label="اطلاعات تماس" value="4" icon={<Phone />} iconPosition="start" />
                <Tab label="حساب‌های بانکی" value="5" icon={<AccountBalance />} iconPosition="start" />
                <Tab label="اطلاعات تکمیلی" value="6" icon={<Event />} iconPosition="start" />
              </TabList>
            </Box>

            {/* محتوای تب اطلاعات عمومی */}
            <TabPanel value="1">
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <TextField
                    name="code"
                    label="کد حسابداری *"
                    value={formData.code}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.code}
                    helperText={errors.code || "کد 7 رقمی منحصر به فرد"}
                    inputProps={{ maxLength: 7 }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="company"
                    label="نام شرکت"
                    value={formData.company}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    name="title"
                    label="عنوان"
                    value={formData.title}
                    onChange={handleChange}
                    select
                    fullWidth
                  >
                    <MenuItem value="آقای">آقای</MenuItem>
                    <MenuItem value="خانم">خانم</MenuItem>
                    <MenuItem value="شرکت">شرکت</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    name="firstName"
                    label="نام *"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    name="lastName"
                    label="نام خانوادگی *"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="nickname"
                    label="نام مستعار"
                    value={formData.nickname}
                    onChange={handleChange}
                    fullWidth
                    helperText="این نام باید یکتا باشد"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="category"
                    label="دسته بندی"
                    value={formData.category}
                    onChange={handleChange}
                    select
                    fullWidth
                  >
                    <MenuItem value="">انتخاب کنید</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <FormGroup row sx={{ gap: 4 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isActive}
                          onChange={handleChange}
                          name="isActive"
                          color="primary"
                        />
                      }
                      label="فعال"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isCustomer}
                          onChange={handleChange}
                          name="isCustomer"
                          color="primary"
                        />
                      }
                      label="مشتری"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isSupplier}
                          onChange={handleChange}
                          name="isSupplier"
                          color="primary"
                        />
                      }
                      label="تامین کننده"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isShareholder}
                          onChange={handleChange}
                          name="isShareholder"
                          color="primary"
                        />
                      }
                      label="سهامدار"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isEmployee}
                          onChange={handleChange}
                          name="isEmployee"
                          color="primary"
                        />
                      }
                      label="کارمند"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </TabPanel>

            {/* محتوای تب اطلاعات مالی */}
            <TabPanel value="2">
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <TextField
                    name="creditLimit"
                    label="اعتبار مالی"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ریال</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="priceList"
                    label="لیست قیمت"
                    value={formData.priceList}
                    onChange={handleChange}
                    select
                    fullWidth
                  >
                    <MenuItem value="retail">خرده فروشی</MenuItem>
                    <MenuItem value="wholesale">عمده فروشی</MenuItem>
                    <MenuItem value="special">ویژه</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="taxType"
                    label="نوع مالیات"
                    value={formData.taxType}
                    onChange={handleChange}
                    fullWidth
                    defaultValue="5"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="nationalId"
                    label="شناسه ملی"
                    value={formData.nationalId}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.nationalId}
                    helperText={errors.nationalId}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="economicCode"
                    label="کد اقتصادی"
                    value={formData.economicCode}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="registrationNumber"
                    label="شماره ثبت"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="branchCode"
                    label="کد شعبه"
                    value={formData.branchCode}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ maxLength: 4 }}
                    helperText="حداکثر 4 رقم"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="توضیحات"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 500 }}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* محتوای تب آدرس */}
            <TabPanel value="3">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="آدرس کامل"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
                    inputProps={{ maxLength: 150 }}
                    helperText="حداکثر 150 کاراکتر"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="country"
                    label="کشور"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    defaultValue="ایران"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Autocomplete
                    options={provinces}
                    renderInput={(params) => (
                      <TextField {...params} label="استان" />
                    )}
                    value={formData.province}
                    onChange={(e, value) => handleChange({
                      target: { name: 'province', value }
                    })}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="city"
                    label="شهر"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="postalCode"
                    label="کد پستی"
                    value={formData.postalCode}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    helperText="10 رقم"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* محتوای تب اطلاعات تماس */}
            <TabPanel value="4">
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    name="phone"
                    label="تلفن ثابت"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="mobile"
                    label="موبایل"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="fax"
                    label="فکس"
                    value={formData.fax}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="phone1"
                    label="تلفن ۱"
                    value={formData.phone1}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="phone2"
                    label="تلفن ۲"
                    value={formData.phone2}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="phone3"
                    label="تلفن ۳"
                    value={formData.phone3}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="email"
                    label="ایمیل"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email || "مثال: example@domain.com"}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="website"
                    label="وب‌سایت"
                    value={formData.website}
                    onChange={handleChange}
                    fullWidth
                    helperText="مثال: www.example.com"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* محتوای تب حساب‌های بانکی */}
            <TabPanel value="5">
              {bankAccounts.map((account, index) => (
                <Card key={account.id} className="bank-account-card" sx={{ mb: 2, p: 2 }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                          options={banks}
                          renderInput={(params) => (
                            <TextField {...params} label="نام بانک" required />
                          )}
                          value={account.bank}
                          onChange={(e, value) => handleBankAccountChange(account.id, 'bank', value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="شماره حساب"
                          value={account.accountNumber}
                          onChange={(e) => handleBankAccountChange(account.id, 'accountNumber', e.target.value)}
                          fullWidth
                          inputProps={{ maxLength: 30 }}
                          helperText="حداکثر 30 رقم"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="شماره کارت"
                          value={account.cardNumber}
                          onChange={(e) => handleBankAccountChange(account.id, 'cardNumber', e.target.value)}
                          fullWidth
                          inputProps={{ maxLength: 20 }}
                          helperText="حداکثر 20 رقم"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="شماره شبا"
                          value={account.sheba}
                          onChange={(e) => handleBankAccountChange(account.id, 'sheba', e.target.value)}
                          fullWidth
                          inputProps={{ maxLength: 32 }}
                          helperText="IR + 24 رقم"
                        />
                      </Grid>
                      {index > 0 && (
                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                          <Tooltip title="حذف حساب بانکی">
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveBankAccount(account.id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              <Button
                startIcon={<AddCircleOutline />}
                onClick={handleAddBankAccount}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                افزودن حساب بانکی جدید
              </Button>
            </TabPanel>

            {/* محتوای تب اطلاعات تکمیلی */}
            <TabPanel value="6">
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="تاریخ تولد"
                    value={formData.birthDate}
                    onChange={(newValue) => handleDateChange('birthDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    mask="____/__/__"
                    inputFormat="jYYYY/jMM/jDD"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="تاریخ ازدواج"
                    value={formData.marriageDate}
                    onChange={(newValue) => handleDateChange('marriageDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    mask="____/__/__"
                    inputFormat="jYYYY/jMM/jDD"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="تاریخ عضویت"
                    value={formData.membershipDate}
                    onChange={(newValue) => handleDateChange('membershipDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    mask="____/__/__"
                    inputFormat="jYYYY/jMM/jDD"
                    defaultValue={moment("2025-03-29")}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>

          {/* دکمه‌های عملیات */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/persons')}
              disabled={loading}
              startIcon={<Cancel />}
            >
              انصراف
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<Save />}
              onClick={handleSubmit}
            >
              {loading ? 'در حال ذخیره...' : 'ذخیره'}
            </Button>
          </Box>
        </Paper>

        {/* نمایش پیام موفقیت */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}

export default NewPerson;