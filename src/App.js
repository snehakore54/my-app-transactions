import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';
import './App.css';

const App = () => (
    <Router>
        <div className="app">
            <Routes>
                <Route path="/" element={<Transactions />} />
                <Route path="/add" element={<AddTransaction />} />
            </Routes>
        </div>
    </Router>
);

export default App;
