import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import Chart from 'react-apexcharts';
import './Dashboard.css';

function Dashboard({ persons, invoices, receipts, payments, checks, exchangeRates }) {
  const totalBalance = persons.reduce((sum, p) => sum + Number(p.balance), 0);
  const today = new Date().toISOString().split('T')[0];
  
  // محاسبه فروش امروز
  const todayIncome = invoices
    .filter((inv) => inv.date === today)
    .reduce((sum, inv) => sum + inv.items.reduce((s, i) => s + i.quantity * i.price, 0), 0);

  // محاسبه دریافتی‌های امروز
  const todayReceipts = receipts
    .filter((r) => r.date === today)
    .reduce((sum, r) => sum + Number(r.amount), 0);

  // محاسبه پرداختی‌های امروز
  const todayPayments = payments
    .filter((p) => p.date === today)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  // نمودار فروش ماهانه
  const monthlySalesChart = {
    options: {
      chart: {
        id: "monthly-sales",
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value.toLocaleString('fa-IR')} ت`
        }
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'نمودار فروش ماهانه',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: 'vazir'
        }
      }
    },
    series: [{
      name: 'فروش',
      data: [30000000, 40000000, 35000000, 50000000, 49000000, 60000000, 70000000, 91000000, 85000000, 90000000, 100000000, 110000000]
    }]
  };

  // نمودار بیشترین فروش محصولات
  const topProductsChart = {
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      title: {
        text: 'بیشترین فروش محصولات',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: 'vazir'
        }
      },
      xaxis: {
        labels: {
          formatter: (value) => `${value.toLocaleString('fa-IR')} ت`
        }
      }
    },
    series: [{
      name: 'مبلغ فروش',
      data: [
        { x: 'محصول 1', y: 80000000 },
        { x: 'محصول 2', y: 65000000 },
        { x: 'محصول 3', y: 50000000 },
        { x: 'محصول 4', y: 45000000 },
        { x: 'محصول 5', y: 30000000 }
      ]
    }]
  };

  // نمودار بدهکاران
  const debtorsChart = {
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['شخص 1', 'شخص 2', 'شخص 3', 'شخص 4', 'شخص 5'],
      title: {
        text: 'بدهکاران',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: 'vazir'
        }
      },
      legend: {
        position: 'bottom'
      }
    },
    series: [44000000, 55000000, 33000000, 41000000, 37000000]
  };

  // نمودار سود و زیان
  const profitLossChart = {
    options: {
      chart: {
        type: 'area',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'نمودار سود و زیان',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: 'vazir'
        }
      },
      xaxis: {
        categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور']
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value.toLocaleString('fa-IR')} ت`
        }
      }
    },
    series: [{
      name: 'سود/زیان',
      data: [15000000, 20000000, 18000000, 25000000, 30000000, 28000000]
    }]
  };

  return (
    <Box className="dashboard">
      <Typography variant="h4" gutterBottom>
        داشبورد حسابینو
      </Typography>
      
      {/* کارت‌های آماری */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="dashboard-card">
            <Typography variant="h6">موجودی کل</Typography>
            <Typography variant="h4">{totalBalance.toLocaleString('fa-IR')} تومان</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="dashboard-card">
            <Typography variant="h6">دریافت امروز</Typography>
            <Typography variant="h4">{todayReceipts.toLocaleString('fa-IR')} تومان</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="dashboard-card">
            <Typography variant="h6">چک‌های دریافتی</Typography>
            <Typography variant="h4">{(checks?.length || 0).toLocaleString('fa-IR')}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="dashboard-card">
            <Typography variant="h6">نرخ دلار</Typography>
            <Typography variant="h4">{(exchangeRates?.USD || 0).toLocaleString('fa-IR')} تومان</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* نمودارها */}
      <Grid container spacing={3}>
        {/* نمودار فروش ماهانه */}
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-chart">
            <Chart
              options={monthlySalesChart.options}
              series={monthlySalesChart.series}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>

        {/* نمودار بیشترین فروش محصولات */}
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-chart">
            <Chart
              options={topProductsChart.options}
              series={topProductsChart.series}
              type="bar"
              height={350}
            />
          </Paper>
        </Grid>

        {/* نمودار بدهکاران */}
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-chart">
            <Chart
              options={debtorsChart.options}
              series={debtorsChart.series}
              type="pie"
              height={350}
            />
          </Paper>
        </Grid>

        {/* نمودار سود و زیان */}
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-chart">
            <Chart
              options={profitLossChart.options}
              series={profitLossChart.series}
              type="area"
              height={350}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;