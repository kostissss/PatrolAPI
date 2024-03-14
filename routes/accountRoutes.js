const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const db = require('../models');
const bcrypt = require('bcryptjs'); // Import bcryptjs


// Define user routes
router.get('/:id', async (req, res) => {
  try {
      const account = await db.Account.findByPk(req.params.id,{
        attributes : { exclude: ['password'] }
      });
      if (!account) {
          return res.status(404).send('account not found');
      }


      res.status(200).json(account);
  } catch (error) {
      console.error('Error getting account:', error);
      res.status(500).send('Error getting account');
  }
});

router.get('/', async (req, res) => {
  try {
      const account = await db.Account.findAll({attributes : { exclude: ['password'] }});
      res.status(200).json(account);
  } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(500).send('Error getting accounts');
  }
});

router.put('/:id', async (req, res) => {
  try {
      const account = await db.Account.findByPk(req.params.id);
      
      if (!account) {
          return res.status(404).send('Account not found');
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const accountData = { ...req.body, password: hashedPassword };


      await account.update(accountData);

      res.status(200).json(account);
  } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).send('Error updating account');
  }
});



router.post('/createAccount', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const accountData = { ...req.body, password: hashedPassword };
    const newAccount = await db.Account.create(accountData);
    res.status(201).json(newAccount);
} catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Error creating account');
}
});



router.delete('/:id', async (req, res) => {
  try {
      const account = await db.Account.findByPk(req.params.id);
      if (!account) {
          return res.status(404).send('account not found');
      }

      await account.destroy();
      res.status(200).json(account);
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).send('Error deleting account');
  }
});

// Export the router
module.exports = router;
