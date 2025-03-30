import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Receipts.css';
import { 
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Switch,
  TextField,
  Paper
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

function Receipt({ persons, addReceipt }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    receiptNumber: '',
    date: new Date().toISOString().split('T')[0],
    project: '',
    description: '',
    currency: 'IRR',
    isAutoNumber: true
  });

  const [items, setItems] = useState([{
    id: 1,
    person: '',
    amount: 0,
    description: ''
  }]);

  const handleAddItem = () => {
    setItems([...items, {
      id: items.length + 1,
      person: '',
      amount: 0,
      description: ''
    }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log('Form submitted:', { ...formData, items });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ mr: 2 }}>
            دریافت
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            startIcon={<AssessmentIcon />}
            sx={{ mx: 1 }}
            disabled
          >
            راس‌گیری
          </Button>
          <Button
            variant="contained"
            color="warning"
            startIcon={<AddIcon />}
            sx={{ mx: 1 }}
          >
            جدید
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            ذخیره
          </Button>
        </Box>

        {/* Main Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ minWidth: 100 }}>شماره:</Typography>
              <TextField
                size="small"
                type="tel"
                value={formData.receiptNumber}
                onChange={(e) => setFormData({...formData, receiptNumber: e.target.value})}
                InputProps={{ readOnly: formData.isAutoNumber }}
                sx={{ ml: 1 }}
              />
              <Switch
                checked={formData.isAutoNumber}
                onChange={(e) => setFormData({...formData, isAutoNumber: e.target.checked})}
                size="small"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ minWidth: 100 }}>تاریخ:</Typography>
              <TextField
                size="small"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                sx={{ ml: 1 }}
              />
            </Box>
          </Grid>

          {/* Receipt Items */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>آیتم‌های دریافت</Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <Typography>{item.id}.</Typography>
                <TextField
                  select
                  label="شخص"
                  value={item.person}
                  onChange={(e) => handleItemChange(item.id, 'person', e.target.value)}
                  size="small"
                  sx={{ minWidth: 200 }}
                >
                  {persons.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </TextField>
                <TextField
                  type="number"
                  label="مبلغ"
                  value={item.amount}
                  onChange={(e) => handleItemChange(item.id, 'amount', e.target.value)}
                  size="small"
                />
                <TextField
                  label="شرح"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={items.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
            >
              افزودن آیتم
            </Button>
          </Grid>

          {/* Summary */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Typography variant="h6" sx={{ ml: 2 }}>
                مجموع: {getTotalAmount().toLocaleString()} ریال
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Receipt;