const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json()); 

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// Webhook route
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body); // Now req.body will be parsed correctly
    res.status(200).send('Webhook received!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
