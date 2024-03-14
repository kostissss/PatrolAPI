const express = require('express');
const router = express.Router();
const Account = require('../models/account');

// Define user routes
router.get('/partner', (req, res) => {
  res.send('GET /sign-up');
});

router.post('/createAccount', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const accountData = { ...req.body, password: hashedPassword };
    const newAccount = await Account.create(accountData);
    res.status(201).json(newAccount);
} catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Error creating account');
}
});

// Export the router
module.exports = router;
