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
    machine01 =req.body.amount;
    res.status(200).send('Webhook received!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/* ALBY PAYLOAD EXAMPLE
{
  "amount": 20,
  "boostagram": null,
  "comment": null,
  "created_at": "2025-02-01T13:28:26.916Z",
  "creation_date": 1738416506,
  "currency": "BTC",
  "custom_records": null,
  "description_hash": "963c81f7ff5ffe04acc38bb794aecb6ff20fde0dd3951ac34c2246f88b26592f",
  "destination_alias": "",
  "destination_pubkey": "030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3",
  "expires_at": "2025-02-02T13:28:26.000Z",
  "expiry": 86400,
  "fee": 0,
  "fiat_currency": "BRL",
  "fiat_in_cents": 12,
  "first_route_hint_alias": null,
  "first_route_hint_pubkey": null,
  "identifier": "eFbMjeWXwWo7kXvDqxgoTAAk",
  "keysend_message": null,
  "memo": "[[\"text/plain\",\"Paid to Lucas Carvalho (Order ID: test123)\"]]",
  "metadata": null,
  "payer_email": null,
  "payer_name": null,
  "payer_pubkey": null,
  "payment_hash": "402c206dabf90a1a14813192194894cc1ca67d70b1cbed0806ff9eb54294c8ca",
  "payment_request": "lnbc200n1pneugt6pp5gqkzqmdtly9p59ypxxfpjjy5esw2vltsk8976zqxl70t2s55er9qhp5jc7gralltllqftxr3wmeftktdleqlhsd6w234s6vyfr03zextyhscqzzsxqyz5vqsp5hus2wscle4muaaevdjqdclck4avf2zc8vedu0dxn49y6wxz877hs9qxpqysgqfcc8rjvq6z4zmym8la3fn46h7ssfl5663whn6gn0xkt0nmhhu2v89hn9q5daams4kvrexv3y75qn7mu0qq6y6ehmuyjv64vepf3cnesq7kaqml",
  "preimage": "2c1512c0148ca9ad4c390429b70e1f3f198d6e4201e1e41e979faa63f9d7bd85",
  "r_hash_str": "402c206dabf90a1a14813192194894cc1ca67d70b1cbed0806ff9eb54294c8ca",
  "settled": true,
  "settled_at": "2025-02-01T13:28:27.000Z",
  "state": "SETTLED",
  "type": "incoming",
  "value": 20
}
*/
