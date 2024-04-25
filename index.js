const express = require('express');
const app = express();
const PORT = 3000;
const accountRoutes = require('./routes/accountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const guardRoutes = require('./routes/guardRoutes');
const checkPointRoutes = require('./routes/checkPointRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const cors = require('cors'); // Import the CORS library
const cookieParser = require("cookie-parser");
app.use(express.json());

const db = require('./models');

app.use(cors( {
  origin: 'http://localhost:4200',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
} ));


app.use(cookieParser());


app.use(authMiddleware);
function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${new Date().toLocaleString()}`);
  next(); 
}

app.use(loggerMiddleware); 


app.get('/', (req, res) => {
    res.send('Hello World');
    }
);


app.use('/accounts', accountRoutes);
app.use('/notifications', notificationRoutes);
app.use('/guards', guardRoutes);
app.use('/checkPoints', checkPointRoutes);




db.sequelize
  .sync({
    /* alter: true*/
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });
  });
module.exports = app;