import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

function CurrencyDialog({ open, handleClose, onSave }) {
  const [currencyData, setCurrencyData] = useState({
    name: '',
    symbol: '',
    rate: 1
  });

  const handleSave = () => {
    onSave(currencyData);
    handleClose();
    setCurrencyData({ name: '', symbol: '', rate: 1 });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>افزودن واحد پول جدید</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400, pt: 2 }}>
          <TextField
            label="نام واحد پول"
            value={currencyData.name}
            onChange={(e) => setCurrencyData({ ...currencyData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="نماد"
            value={currencyData.symbol}
            onChange={(e) => setCurrencyData({ ...currencyData, symbol: e.target.value })}
            fullWidth
          />
          <TextField
            label="نرخ تبدیل"
            type="number"
            value={currencyData.rate}
            onChange={(e) => setCurrencyData({ ...currencyData, rate: e.target.value })}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>انصراف</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CurrencyDialog;