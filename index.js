const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port
const accountRoutes = require('./routes/accountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
<<<<<<< HEAD
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
=======
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors'); // Import the CORS library
const cookieParser = require("cookie-parser");
app.use(express.json());

const db = require('./models');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true 
}));



app.use(cookieParser());


app.use(authMiddleware);

>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/accounts', accountRoutes);
app.use('/notifications', notificationRoutes);

<<<<<<< HEAD
// Sync database
db.sequelize.sync().then(() => {
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database sync error:', err);
});
=======

db.sequelize.sync({/* alter: true*/  } ).then(() => {

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }

);
});
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
