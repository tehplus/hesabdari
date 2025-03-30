import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  Switch,
  IconButton,
  FormControlLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectDialog from '../components/ProjectDialog';
import CurrencyDialog from '../components/CurrencyDialog';
import './Receipts.css';

function Receipts({ persons, addReceipt }) {
  const navigate = useNavigate();
  const [receiptNumber, setReceiptNumber] = useState('1000');
  const [isAutoNumber, setIsAutoNumber] = useState(true);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [currencyDialogOpen, setCurrencyDialogOpen] = useState(false);
  
  const [projects, setProjects] = useState([
    { id: 1, name: 'پروژه 1', isDefault: true },
    { id: 2, name: 'پروژه 2', isDefault: false }
  ]);

  const [currencies, setCurrencies] = useState([
    { id: 1, name: 'ریال', symbol: 'IRR', rate: 1 },
    { id: 2, name: 'تومان', symbol: 'IRT', rate: 0.1 }
  ]);

  const [formData, setFormData] = useState({
    receiptNumber: '',
    person: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    project: '',
    currency: '1'  // Default to Rial
  });

  useEffect(() => {
    if (isAutoNumber) {
      setFormData(prev => ({ ...prev, receiptNumber }));
    }
  }, [receiptNumber, isAutoNumber]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoNumberChange = (e) => {
    setIsAutoNumber(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, receiptNumber }));
    }
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData
    };
    setProjects([...projects, newProject]);
    if (projectData.isDefault) {
      setFormData(prev => ({ ...prev, project: newProject.id }));
    }
  };

  const handleAddCurrency = (currencyData) => {
    const newCurrency = {
      id: currencies.length + 1,
      ...currencyData
    };
    setCurrencies([...currencies, newCurrency]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReceipt(formData);
    // Increment receipt number for next use
    setReceiptNumber(prev => String(Number(prev) + 1));
    navigate('/receipts-list');
  };

  return (
    <Box className="receipts">
      <Typography variant="h4" gutterBottom>
        دریافت جدید
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                label="شماره رسید"
                name="receiptNumber"
                value={formData.receiptNumber}
                onChange={handleChange}
                disabled={isAutoNumber}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isAutoNumber}
                    onChange={handleAutoNumberChange}
                  />
                }
                label="شماره خودکار"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                select
                fullWidth
                label="پروژه"
                name="project"
                value={formData.project}
                onChange={handleChange}
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

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="شخص"
              name="person"
              value={formData.person}
              onChange={handleChange}
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
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                select
                fullWidth
                label="واحد پول"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.id} value={currency.id}>
                    {currency.name} ({currency.symbol})
                  </MenuItem>
                ))}
              </TextField>
              <IconButton color="primary" onClick={() => setCurrencyDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="مبلغ"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
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
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              ثبت دریافت
            </Button>
          </Grid>
        </Grid>
      </form>

      <ProjectDialog
        open={projectDialogOpen}
        handleClose={() => setProjectDialogOpen(false)}
        onSave={handleAddProject}
      />

      <CurrencyDialog
        open={currencyDialogOpen}
        handleClose={() => setCurrencyDialogOpen(false)}
        onSave={handleAddCurrency}
      />
    </Box>
  );
}

export default Receipts;