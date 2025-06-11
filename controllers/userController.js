const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, expiresIn } = require('../middlewares/key');
const authentication = require('../middlewares/auth');

exports.signup = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.send({ status: 200, message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.send({ status: 500, message: 'Server error' });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.send({ status: 401, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.send({ status: 401, message: 'Invalid password' });
        }

        if (!user.status)
            return res.send({ status: 401, message: 'Not allow in site' });

        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, SECRET_KEY, { expiresIn: expiresIn });
        res.send({status: 200, token: token, user: user, message: 'Login Successful!' });

    } catch (error) {
        console.error(error);
        res.send({status: 500, message: 'Server error' });
    }
};

exports.getProfile = (authentication, (req, res) => {
    res.send({ status: '', message: `Hello, ${req.user.username}` });
});
