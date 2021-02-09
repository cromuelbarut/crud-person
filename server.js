const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// connect to db
connectDB();

// middleware
app.use(express.json({ extended: false }));

// route
app.use('/api/person', require('./routes/person'));

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}`));
