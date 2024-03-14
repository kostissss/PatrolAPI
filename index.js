const express = require('express');
const app = express();
const PORT = 3000;
const accountRoutes = require('./routes/accountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
app.use(express.json());

const db = require('./models');


app.get('/', (req, res) => {
    res.send('Hello World');
    }
);


app.use('/accounts', accountRoutes);
app.use('/notifications', notificationRoutes);

db.sequelize.sync().then(() => {

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }

);
});