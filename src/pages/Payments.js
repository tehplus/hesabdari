import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Payments.css';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  MenuItem,
  InputAdornment
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  Save as SaveIcon,
  FileCopy as CopyIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import ProjectDialog from '../components/ProjectDialog';
import './Payments.css';

function Payments({ persons, addPayment }) {
  const navigate = useNavigate();
  const [isAutoNumber, setIsAutoNumber] = useState(true);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    paymentNumber: '1000',
    date: new Date().toISOString().split('T')[0],
    project: '',
    description: '',
    currency: 'IRR'
  });

  const [paymentItems, setPaymentItems] = useState([{
    id: 1,
    person: '',
    amount: '',
    description: ''
  }]);

  const [projects] = useState([
    { id: 1, name: 'پروژه 1' },
    { id: 2, name: 'پروژه 2' }
  ]);

  const handleAutoNumberChange = (event) => {
    setIsAutoNumber(event.target.checked);
  };

  const handleAddProject = (projectData) => {
    // Handle adding new project
    console.log('New project:', projectData);
    setProjectDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id, field, value) => {
    setPaymentItems(paymentItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addPaymentItem = () => {
    setPaymentItems([
      ...paymentItems,
      {
        id: paymentItems.length + 1,
        person: '',
        amount: '',
        description: ''
      }
    ]);
  };

  const removePaymentItem = (id) => {
    if (paymentItems.length > 1) {
      setPaymentItems(paymentItems.filter(item => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return paymentItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      ...formData,
      items: paymentItems
    };
    addPayment(paymentData);
    navigate('/payments-list');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ mr: 2 }}>
            پرداخت
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            startIcon={<FileCopy />}
            variant="outlined"
            sx={{ mx: 1 }}
          >
            کپی
          </Button>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="warning"
            sx={{ mx: 1 }}
          >
            جدید
          </Button>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            ذخیره
          </Button>
        </Box>

        {/* Main Form */}
        <Grid container spacing={3}>
          {/* First Row */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="شماره"
                name="paymentNumber"
                value={formData.paymentNumber}
                onChange={handleChange}
                disabled={isAutoNumber}
                fullWidth
                InputProps={{
                  style: { direction: 'ltr' }
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isAutoNumber}
                    onChange={handleAutoNumberChange}
                  />
                }
                label="اتوماتیک"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="تاریخ"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                select
                label="پروژه"
                name="project"
                value={formData.project}
                onChange={handleChange}
                fullWidth
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>
              <IconButton color="primary" onClick={() => setProjectDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="واحد پول"
              value="ریال"
              fullWidth
              disabled
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="شرح"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          {/* Payment Items */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>آیتم‌های پرداخت</Typography>
            {paymentItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  select
                  label="شخص"
                  value={item.person}
                  onChange={(e) => handleItemChange(item.id, 'person', e.target.value)}
                  sx={{ minWidth: 200 }}
                >
                  {persons.map((person) => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="مبلغ"
                  type="number"
                  value={item.amount}
                  onChange={(e) => handleItemChange(item.id, 'amount', e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ریال</InputAdornment>,
                    style: { direction: 'ltr' }
                  }}
                />
                <TextField
                  label="شرح"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton
                  color="error"
                  onClick={() => removePaymentItem(item.id)}
                  disabled={paymentItems.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addPaymentItem}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              افزودن آیتم
            </Button>
          </Grid>

          {/* Summary */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Typography variant="h6" color="primary">
                مجموع: {calculateTotal().toLocaleString()} ریال
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Project Dialog */}
      <ProjectDialog
        open={projectDialogOpen}
        handleClose={() => setProjectDialogOpen(false)}
        onSave={handleAddProject}
      />
    </Box>
  );
}

export default Payments;