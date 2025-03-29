import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, MenuItem, Grid } from '@mui/material';
import './Payments.css';

function Payments({ persons, addPayment }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    person: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPayment(formData);
    navigate('/payments'); // فعلاً به خودش برمی‌گرده چون لیست پرداخت‌ها رو هنوز نساختیم
  };

  return (
    <Box className="payments">
      <Typography variant="h4" gutterBottom>
        پرداخت جدید
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="شخص"
              name="person"
              value={formData.person}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {persons.map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="مبلغ (تومان)"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              variant="outlined"
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="تاریخ"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="توضیحات"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              ثبت پرداخت
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Payments;