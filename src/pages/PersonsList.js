import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import './PersonsList.css';

function PersonsList({ persons, deletePerson, updatePerson }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editPerson, setEditPerson] = useState(null);

  const handleEdit = (person) => {
    setEditPerson(person);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPerson(null);
  };

  const handleSave = () => {
    updatePerson(editPerson);
    handleClose();
  };

  const handleChange = (e) => {
    setEditPerson({ ...editPerson, [e.target.name]: e.target.value });
  };

  return (
    <Box className="persons-list">
      <Typography variant="h4" gutterBottom>
        لیست اشخاص
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate('/new-person')}>
        افزودن شخص جدید
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شماره</TableCell>
              <TableCell>نام و نام خانوادگی</TableCell>
              <TableCell>شماره تماس</TableCell>
              <TableCell>موجودی</TableCell>
              <TableCell>نوع</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.id}</TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>
                  {Number(person.balance).toLocaleString('fa-IR')} تومان
                </TableCell>
                <TableCell>{person.type}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(person)}>
                    ویرایش
                  </Button>
                  <Button variant="outlined" color="error" size="small" sx={{ mr: 1 }} onClick={() => deletePerson(person.id)}>
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* دیالوگ ویرایش */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ویرایش شخص</DialogTitle>
        <DialogContent>
          {editPerson && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="نام و نام خانوادگی"
                name="name"
                value={editPerson.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="شماره تماس"
                name="phone"
                value={editPerson.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="موجودی (تومان)"
                name="balance"
                value={editPerson.balance}
                onChange={handleChange}
                variant="outlined"
                type="number"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">لغو</Button>
          <Button onClick={handleSave} color="primary">ذخیره</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PersonsList;