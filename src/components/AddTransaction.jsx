import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddTransaction.css';

const AddTransaction = () => {
    const [type, setType] = useState('Credit');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString();
        axios.post('/api/transactions', { type, amount, description, date })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error adding the transaction!', error);
            });
    };

    return (
        <div className="add-transaction">
            <h1>New Transaction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Transaction Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </label>
                <label>
                    Amount:
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Description:
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddTransaction;
