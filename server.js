const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json()); 

var machine01 = 0;

app.get('/check-payment', (req, res) => {
    var temp = machine01;
    machine01 = 0;
    res.send(""+temp);
});

// Webhook route
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body); // Now req.body will be parsed correctly
    machine01 = 100;
    res.status(200).send('Webhook received!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
