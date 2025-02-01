const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route - returns "Hello, World!"
app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// POST route - Webhook listener
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).json({ message: 'Webhook received successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
