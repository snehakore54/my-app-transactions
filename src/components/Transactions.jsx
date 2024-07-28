import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get('/api/transactions')
            .then(response => {
                setTransactions(response.data.transactions);
                setBalance(response.data.runningBalance);
            })
            .catch(error => {
                console.error('There was an error fetching the transactions!', error);
            });
    }, []);

    return (
        <div className="transactions">
            <h1>Office Transactions</h1>
            <Link to="/add" className="add-transaction">+ Add Transaction</Link>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Running Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.type === 'Credit' ? transaction.amount : ''}</td>
                            <td>{transaction.type === 'Debit' ? transaction.amount : ''}</td>
                            <td>{balance - transactions.slice(index + 1).reduce((acc, curr) => acc + (curr.type === 'Credit' ? curr.amount : -curr.amount), 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="balance">Running Balance: {balance}</div>
        </div>
    );
};

export default Transactions;
