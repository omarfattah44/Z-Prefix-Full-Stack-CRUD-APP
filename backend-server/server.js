require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');


app.use('/api/auth', userRoutes);
app.use('/api/items', itemRoutes);

// test route
app.get('/', function(req, res) {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});