const express = require('express');
const router = express.Router();


const dbFunctions = require('../dbFunctions/accountFunctions');


// Define user routes
router.get('/:id', async (req, res) => {
  try {
      const account =dbFunctions.getAccountById(req.params.id);
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
    const account = dbFunctions.getAllAccounts();
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
    const newAccount = await dbFunctions.createAccount(req.body);
    res.status(201).json(newAccount);
} catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Error creating account');
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

// Export the router
module.exports = router;
