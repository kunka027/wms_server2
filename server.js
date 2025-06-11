const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // <-- Required to parse JSON

// Import routes
const routes = require('./routes/index');

// Use the routes
app.use('/', routes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
