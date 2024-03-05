const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

const bcryptSalt = bcrypt.genSaltSync(10);

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
// console.log(process.env.MONGO_URI);

app.get('/test', (req, res) => {
    // res.json('test okay');
    console.log('object');
    res.json('test okay');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    // res.json({ name, email, password });
    const userDoc = await User.create({ name, email, password: bcrypt.hashSync(password, bcryptSalt) });

    res.json(userDoc);
});

const PORT = 4080;

app.listen(PORT, () => {
    console.log(`Our app is running on the port ${PORT}`);
});