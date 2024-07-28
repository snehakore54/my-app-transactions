const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;  // Changed from 3000 to 4000

app.use(cors());
app.use(express.json());

let transactions = [];
let runningBalance = 0;

app.get('/api/transactions', (req, res) => {
    res.json({ transactions, runningBalance });
});

app.post('/api/transactions', (req, res) => {
    const { type, amount, description, date } = req.body;
    const transaction = { type, amount: parseFloat(amount), description, date };
    transactions.push(transaction);
    runningBalance += type === 'Credit' ? parseFloat(amount) : -parseFloat(amount);
    res.status(201).json(transaction);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
