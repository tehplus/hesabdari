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
    { id: 1, name: 'علی محمدی', phone: '09123456789', balance: '2500000', type: 'مشتری' },
    { id: 2, name: 'رضا حسینی', phone: '09351234567', balance: '-1200000', type: 'تامین‌کننده' },
    { id: 3, name: 'مریم احمدی', phone: '09213456789', balance: '800000', type: 'مشتری' },
  ]);

  const [invoices, setInvoices] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [payments, setPayments] = useState([]);

  const addPerson = (newPerson) => {
    setPersons([...persons, { ...newPerson, id: persons.length + 1 }]);
  };

  const updatePerson = (updatedPerson) => {
    setPersons(persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)));
  };

  const deletePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const addInvoice = (newInvoice) => {
    setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1 }]);
  };

  const addReceipt = (newReceipt) => {
    setReceipts([...receipts, { ...newReceipt, id: receipts.length + 1 }]);
    const person = persons.find((p) => p.id === newReceipt.person);
    if (person) {
      updatePerson({ ...person, balance: String(Number(person.balance) + Number(newReceipt.amount)) });
    }
  };

  const addPayment = (newPayment) => {
    setPayments([...payments, { ...newPayment, id: payments.length + 1 }]);
    const person = persons.find((p) => p.id === newPayment.person);
    if (person) {
      updatePerson({ ...person, balance: String(Number(person.balance) - Number(newPayment.amount)) });
    }
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard persons={persons} invoices={invoices} receipts={receipts} payments={payments} />} />
            <Route path="/persons-list" element={<PersonsList persons={persons} deletePerson={deletePerson} updatePerson={updatePerson} />} />
            <Route path="/new-person" element={<NewPerson addPerson={addPerson} />} />
            <Route path="/new-sale" element={<NewSale persons={persons} addInvoice={addInvoice} />} />
            <Route path="/sales-invoices" element={<SalesInvoices invoices={invoices} persons={persons} />} />
            <Route path="/receipts" element={<Receipts persons={persons} addReceipt={addReceipt} />} />
            <Route path="/receipts-list" element={<ReceiptsList receipts={receipts} persons={persons} />} />
            <Route path="/payments" element={<Payments persons={persons} addPayment={addPayment} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;