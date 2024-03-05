const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/test', (req, res) => {
    // res.json('test okay');
    console.log('object');
    res.json('test okay');
});

const PORT = 4080;

app.listen(PORT, () => {
    console.log(`Our app is running on the port ${PORT}`);
});