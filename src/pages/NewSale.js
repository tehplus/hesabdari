import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, MenuItem, Grid, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import './NewSale.css';

function NewSale({ persons, addInvoice }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    items: [],
  });
  const [item, setItem] = useState({ name: '', quantity: '', price: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (item.name && item.quantity && item.price) {
      setFormData({ ...formData, items: [...formData.items, { ...item, id: formData.items.length + 1 }] });
      setItem({ name: '', quantity: '', price: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvoice(formData);
    navigate('/sales-invoices');
  };

  const total = formData.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <Box className="new-sale">
      <Typography variant="h4" gutterBottom>
        فروش جدید
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="مشتری"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {persons.filter(p => p.type === 'مشتری').map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))}
            </TextField>
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
            <Typography variant="h6">اقلام فاکتور</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="نام کالا"
                  name="name"
                  value={item.name}
                  onChange={handleItemChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="تعداد"
                  name="quantity"
                  value={item.quantity}
                  onChange={handleItemChange}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="قیمت واحد (تومان)"
                  name="price"
                  value={item.price}
                  onChange={handleItemChange}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" onClick={addItem}>اضافه کردن</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شماره</TableCell>
                  <TableCell>نام کالا</TableCell>
                  <TableCell>تعداد</TableCell>
                  <TableCell>قیمت واحد</TableCell>
                  <TableCell>جمع</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.items.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.id}</TableCell>
                    <TableCell>{i.name}</TableCell>
                    <TableCell>{i.quantity}</TableCell>
                    <TableCell>{Number(i.price).toLocaleString('fa-IR')}</TableCell>
                    <TableCell>{Number(i.quantity * i.price).toLocaleString('fa-IR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h6" sx={{ mt: 2 }}>
              مجموع: {total.toLocaleString('fa-IR')} تومان
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              ثبت فاکتور
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default NewSale;