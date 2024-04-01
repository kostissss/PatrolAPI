const express = require('express');
const app = express();
const PORT = 3000;
const accountRoutes = require('./routes/accountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const cookieParser = require("cookie-parser");
app.use(express.json());

const db = require('./models');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);


app.use('/accounts', accountRoutes);
app.use('/notifications', notificationRoutes);


db.sequelize.sync({ alter: true  } ).then(() => {

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }

);
});