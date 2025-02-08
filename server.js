const express = require('express');
const { Webhook } = require("svix");

const app = express();
const PORT = process.env.PORT || 3000;

// Svix Webhook Secret (Ensure this is stored securely, e.g., via environment variables)
const SVIX_SECRET = process.env.SVIX_SECRET;
const SATOSHI_BRL = 178;

// Middleware to parse JSON bodies
app.use(express.json());

var machine01 = 0;

//1 real ou 1 BRL = 178 satoshis
function converterSatoshis(valor) {
    var valorAux = 0;
    var ticket = 0;
    ticket = SATOSHI_BRL; 

    if (valor >= ticket) {
        valorAux = valor;
        valor = 0;
        //creditos
        var creditos = valorAux / ticket;
        creditos = Math.floor(creditos);
        var pulsosFormatados = ("0000" + creditos).slice(-4);
        return pulsosFormatados;
    } else {
        return "0000";
    }
}

// teste da nossa funcao auxiliar
app.post('/check-payment-test', (req, res) => {
    res.send("" + converterSatoshis(req.body.valor));
});

// GET route to check payment status
app.get('/check-payment', (req, res) => {
    var temp = machine01;
    machine01 = 0;
    res.send("" + converterSatoshis(temp));
});

// Webhook route with verification
app.post('/webhook', (req, res) => {
    const headers = req.headers;
    const payload = JSON.stringify(req.body);

    try {
        const wh = new Webhook(SVIX_SECRET);
        wh.verify(payload, {
            "svix-id": headers["svix-id"],
            "svix-timestamp": headers["svix-timestamp"],
            "svix-signature": headers["svix-signature"],
        });

        console.log("✅ Webhook verified successfully:", req.body);
        machine01 = req.body.amount;
        res.status(200).send("Webhook received!");
    } catch (error) {
        console.error("❌ Webhook verification failed:", error.message);
        res.status(400).send("Invalid webhook signature");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
