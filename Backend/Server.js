const express = require('express');
const cors = require('cors');
const connectDB = require('./src/DB/DB.js');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./src/routes/auth.js'));
app.use('/api/leads', require('./src/routes/Lead.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));