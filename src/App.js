import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PersonsList from './pages/PersonsList';
import NewPerson from './pages/NewPerson';
import NewSale from './pages/NewSale';
import SalesInvoices from './pages/SalesInvoices';
import Receipts from './pages/Receipts';
import ReceiptsList from './pages/ReceiptsList';
import Payments from './pages/Payments';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    {
      id: 1,
      code: '1000001',
      category: 'A',
      nickname: 'تکنوساین',
      company: 'شرکت فناوری اطلاعات تکنوساین',
      country: 'ایران',
      province: 'تهران',
      city: 'تهران',
      mobile: '09121234567',
      phone: '02188776655',
      email: 'info@technosign.co',
      nationalId: '10862085674',
      economicCode: '411533789451',
      registrationNumber: '567890',
      isActive: true,
      birthDate: null,
      membershipDate: '2025-01-15',
      isCustomer: true,
      isSupplier: false,
      isEmployee: false,
      balance: '2500000',
      type: 'مشتری',
      createdAt: '2025-03-29 23:24:41',
      createdBy: 'tehplus'
    },
    {
      id: 2,
      code: '1000002',
      category: 'B',
      nickname: 'پارس سیستم',
      company: 'گروه مهندسی پارس سیستم',
      country: 'ایران',
      province: 'اصفهان',
      city: 'اصفهان',
      mobile: '09133334444',
      phone: '03137894561',
      email: 'contact@parssystem.ir',
      nationalId: '10957463215',
      economicCode: '411678945123',
      registrationNumber: '234567',
      isActive: true,
      birthDate: null,
      membershipDate: '2025-02-01',
      isCustomer: true,
      isSupplier: true,
      isEmployee: false,
      balance: '-1200000',
      type: 'تامین‌کننده',
      createdAt: '2025-03-29 23:24:41',
      createdBy: 'tehplus'
    },
    {
      id: 3,
      code: '1000003',
      category: 'A',
      nickname: 'علی محمدی',
      company: '',
      country: 'ایران',
      province: 'تهران',
      city: 'تهران',
      mobile: '09351112233',
      phone: '02144556677',
      email: 'ali.m@gmail.com',
      nationalId: '0075849261',
      economicCode: '',
      registrationNumber: '',
      isActive: true,
      birthDate: '1985-06-15',
      membershipDate: '2025-02-15',
      isCustomer: false,
      isSupplier: false,
      isEmployee: true,
      balance: '800000',
      type: 'کارمند',
      createdAt: '2025-03-29 23:24:41',
      createdBy: 'tehplus'
    }
  ]);

  const [invoices, setInvoices] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [payments, setPayments] = useState([]);

  // تابع اضافه کردن شخص جدید
  const addPerson = (newPerson) => {
    const timestamp = '2025-03-29 23:24:41'; // Current timestamp
    const username = 'tehplus'; // Current username

    const personWithMeta = {
      ...newPerson,
      id: persons.length + 1,
      code: `100000${persons.length + 1}`,
      createdAt: timestamp,
      createdBy: username,
      isActive: true,
      membershipDate: timestamp.split(' ')[0] // فقط تاریخ
    };

    setPersons([...persons, personWithMeta]);
  };

  // تابع بروزرسانی شخص
  const updatePerson = (updatedPerson) => {
    setPersons(persons.map(person => 
      person.id === updatedPerson.id 
        ? { 
            ...person, 
            ...updatedPerson,
            updatedAt: '2025-03-29 23:24:41',
            updatedBy: 'tehplus'
          }
        : person
    ));
  };

  // تابع حذف شخص
  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  };

  // تابع اضافه کردن فاکتور جدید
  const addInvoice = (newInvoice) => {
    const invoiceWithMeta = {
      ...newInvoice,
      id: invoices.length + 1,
      createdAt: '2025-03-29 23:24:41',
      createdBy: 'tehplus'
    };
    setInvoices([...invoices, invoiceWithMeta]);
  };

  // تابع اضافه کردن دریافت جدید
  const addReceipt = (newReceipt) => {
    const receiptWithMeta = {
      ...newReceipt,
      id: receipts.length + 1,
      createdAt: '2025-03-29 23:24:41',
      createdBy: 'tehplus'
    };
    setReceipts([...receipts, receiptWithMeta]);

    // بروزرسانی موجودی شخص
    const person = persons.find(p => p.id === newReceipt.person);
    if (person) {
      updatePerson({
        ...person,
        balance: String(Number(person.balance) + Number(newReceipt.amount))
      });
    }
  };

  // تابع اضافه کردن پرداخت جدید
  const addPayment = (newPayment) => {
    const paymentWithMeta = {
      ...newPayment,
      id: payments.length + 1,
      createdAt: '2025-03-29 23:24:41',
      createdBy: 'tehplus'
    };
    setPayments([...payments, paymentWithMeta]);

    // بروزرسانی موجودی شخص
    const person = persons.find(p => p.id === newPayment.person);
    if (person) {
      updatePerson({
        ...person,
        balance: String(Number(person.balance) - Number(newPayment.amount))
      });
    }
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  persons={persons} 
                  invoices={invoices} 
                  receipts={receipts} 
                  payments={payments} 
                />
              } 
            />
            <Route 
              path="/persons" 
              element={
                <PersonsList 
                  persons={persons} 
                  deletePerson={deletePerson} 
                  updatePerson={updatePerson} 
                />
              } 
            />
            <Route 
              path="/new-person" 
              element={
                <NewPerson 
                  addPerson={addPerson}
                  updatePerson={updatePerson}
                  persons={persons}
                />
              } 
            />
            <Route 
              path="/new-sale" 
              element={
                <NewSale 
                  persons={persons} 
                  addInvoice={addInvoice} 
                />
              } 
            />
            <Route 
              path="/sales-invoices" 
              element={
                <SalesInvoices 
                  invoices={invoices} 
                  persons={persons} 
                />
              } 
            />
            <Route 
              path="/receipts" 
              element={
                <Receipts 
                  persons={persons} 
                  addReceipt={addReceipt} 
                />
              } 
            />
            <Route 
              path="/receipts-list" 
              element={
                <ReceiptsList 
                  receipts={receipts} 
                  persons={persons} 
                />
              } 
            />
            <Route 
              path="/payments" 
              element={
                <Payments 
                  persons={persons} 
                  addPayment={addPayment} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;