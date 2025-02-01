const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Use Heroku's assigned port or fallback to 3000

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
