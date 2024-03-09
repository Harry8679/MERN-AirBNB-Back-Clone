const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    try {
        const userDoc = await User.create({ name, email, password: bcrypt.hashSync(password, bcryptSalt) });
        res.json(userDoc);
    } catch(err) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        
        if (passOk) {
            jwt.sign({ id: userDoc._id, email: userDoc.email }, process.env.SECRET_KEY, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('Password okay');
            });
        } else {
            res.status(422).json('Password not okay');
        }
    } else {
        res.json('Not Found');
    }
});

const PORT = 4080;

app.listen(PORT, () => {
    console.log(`Our app is running on the port ${PORT}`);
});