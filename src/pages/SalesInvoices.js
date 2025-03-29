import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './SalesInvoices.css';

function SalesInvoices({ invoices, persons }) {
  return (
    <Box className="sales-invoices">
      <Typography variant="h4" gutterBottom>
        فاکتورهای فروش
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شماره فاکتور</TableCell>
              <TableCell>مشتری</TableCell>
              <TableCell>تاریخ</TableCell>
              <TableCell>تعداد اقلام</TableCell>
              <TableCell>جمع کل</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => {
              const customer = persons.find((p) => p.id === invoice.customer);
              const total = invoice.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
              return (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{customer ? customer.name : 'نامشخص'}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.items.length}</TableCell>
                  <TableCell>{total.toLocaleString('fa-IR')} تومان</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SalesInvoices;