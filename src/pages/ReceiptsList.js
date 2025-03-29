import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './ReceiptsList.css';

function ReceiptsList({ receipts, persons }) {
  return (
    <Box className="receipts-list">
      <Typography variant="h4" gutterBottom>
        لیست دریافت‌ها
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شماره</TableCell>
              <TableCell>شخص</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>تاریخ</TableCell>
              <TableCell>توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt) => {
              const person = persons.find((p) => p.id === receipt.person);
              return (
                <TableRow key={receipt.id}>
                  <TableCell>{receipt.id}</TableCell>
                  <TableCell>{person ? person.name : 'نامشخص'}</TableCell>
                  <TableCell>{Number(receipt.amount).toLocaleString('fa-IR')} تومان</TableCell>
                  <TableCell>{receipt.date}</TableCell>
                  <TableCell>{receipt.description || '-'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReceiptsList;