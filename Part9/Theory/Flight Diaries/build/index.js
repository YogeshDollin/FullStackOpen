"use strict";
const express = require('express');
const app = express();
app.get('/ping', (_req, res) => {
    console.log('Someone pinged here.');
    res.send('pong');
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
