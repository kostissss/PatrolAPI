const express = require('express');
const router = express.Router();


const dbFunctions = require('../dbFunctions/AccountFunctions');


// Define user routes
router.get('/:id', async (req, res) => {
  try {
      const account =await dbFunctions.getAccountById(req.params.id);
      if (!account) {
          return res.status(404).send('account not found');
      }

      console.log('account2:', account);
      res.status(200).json(account);
  } catch (error) {
      console.error('Error getting account:', error);
      res.status(500).send('Error getting account');
  }
});

router.get('/', async (req, res) => {
  try {
    const account =await dbFunctions.getAllAccounts();
    res.status(200).json(account);
  } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(500).send('Error getting accounts');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAccount = await dbFunctions.updateAccount(req.params.id, req.body);

    res.status(200).json(updatedAccount);
  } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).send('Error updating account');
  }
});



router.post('/', async (req, res) => {
  try {
    const emailExists = await dbFunctions.findAccountByEmail(req.body);
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }
    const usernameExists = await dbFunctions.findAccountByUsername(req.body);
    if (usernameExists) {
        return res.status(400).send('Username already exists');
    }
    const newAccount = await dbFunctions.createAccount(req.body);
    res.status(201).json(newAccount);
} catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send(error);
}
});



router.delete('/:id', async (req, res) => {
  try {
    const deletedAccount = await dbFunctions.deleteAccount(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).send('Error deleting account');
  }
});

router.post('/login', async (req, res) => {
  try {
    const userNameExists = await dbFunctions.findAccountByUsername(req.body);
    if (!userNameExists) {
        return res.status(400).send('Username does not exist');
    }
    const { account, authToken } = await dbFunctions.loginAccount(req.body.id, req.body.password);
    res.status(200).json({ account, authToken });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Error logging in');
  }
}); 



// Export the router
module.exports = router;
