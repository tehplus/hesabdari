import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Dashboard.css';

const Dashboard = () => {
  // State for sales data
  const [salesData, setSalesData] = useState({
    series: [{
      name: 'فروش',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        fontFamily: 'IRANSans, sans-serif',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
      },
      title: {
        text: 'نمودار فروش ماهانه',
        align: 'right',
        style: {
          fontSize: '14px'
        }
      }
    }
  });

  // State for top sales chart
  const [topSalesData, setSTopSalesData] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'IRANSans, sans-serif',
      },
      labels: ['محصول A', 'محصول B', 'محصول C', 'محصول D', 'محصول E'],
      title: {
        text: 'بیشترین فروش',
        align: 'right'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });

  // State for profit/loss chart
  const [profitLossData, setProfitLossData] = useState({
    series: [{
      name: 'سود/زیان',
      data: [2.3, 3.1, -0.4, 2.8, 1.5, -0.2, 3.6]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'IRANSans, sans-serif',
      },
      title: {
        text: 'سود و زیان',
        align: 'right'
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -10,
              to: 0,
              color: '#F15B46'
            }, {
              from: 0,
              to: 10,
              color: '#4CAF50'
            }]
          }
        }
      },
      xaxis: {
        categories: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
      }
    }
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>داشبورد مدیریت</h1>
      </div>
      
      <div className="dashboard-grid">
        {/* نمودار فروش */}
        <div className="chart-container sales-chart">
          <ReactApexChart 
            options={salesData.options} 
            series={salesData.series} 
            type="area" 
            height={350} 
          />
        </div>

        {/* بیشترین فروش */}
        <div className="chart-container top-sales-chart">
          <ReactApexChart 
            options={topSalesData.options} 
            series={topSalesData.series} 
            type="donut" 
            height={350} 
          />
        </div>

        {/* سود و زیان */}
        <div className="chart-container profit-loss-chart">
          <ReactApexChart 
            options={profitLossData.options} 
            series={profitLossData.series} 
            type="bar" 
            height={350} 
          />
        </div>

        {/* کارت‌های اطلاعات */}
        <div className="info-cards">
          {/* بدهکاران */}
          <div className="info-card debtors">
            <h3>بدهکاران</h3>
            <p className="amount">۱۲,۵۰۰,۰۰۰ تومان</p>
            <p className="change positive">+۱۵٪ از ماه گذشته</p>
          </div>

          {/* چک‌های دریافتی */}
          <div className="info-card received-checks">
            <h3>چک‌های دریافتی</h3>
            <p className="amount">۸ چک</p>
            <p className="total">مجموع: ۴۵,۰۰۰,۰۰۰ تومان</p>
          </div>

          {/* نرخ ارز */}
          <div className="info-card exchange-rate">
            <h3>نرخ ارز</h3>
            <div className="currency-rates">
              <div className="rate">
                <span>دلار:</span>
                <span>۵۲,۰۰۰ تومان</span>
              </div>
              <div className="rate">
                <span>یورو:</span>
                <span>۵۶,۰۰۰ تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;