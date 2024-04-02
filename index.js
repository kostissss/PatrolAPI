const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port
const accountRoutes = require('./routes/accountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const partnerAccountRoutes = require('./routes/partnerAccountRoutes');
const cors = require('cors');
const db = require('./models');

app.use(cors());
app.use(express.json());

// Set CORS headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/accounts', accountRoutes);
app.use('/notifications', notificationRoutes);
app.use('/partner/accounts', partnerAccountRoutes);

// Sync database
db.sequelize.sync().then(() => {
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database sync error:', err);
});
