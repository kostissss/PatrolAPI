const express = require('express');
const router = express.Router();
const dbFunctions = require('../dbFunctions/accountFunctions');

// Retrieve an account by ID
router.get('/:id', async (req, res) => {
  try {
    const account = await dbFunctions.getAccountById(req.params.id);
    if (!account) {
      return res.status(404).send('Account not found');
    }
    res.status(200).json(account);
  } catch (error) {
    console.error('Error getting account:', error);
    res.status(500).send('Error getting account');
  }
});

// Retrieve all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await dbFunctions.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error getting accounts:', error);
    res.status(500).send('Error getting accounts');
  }
});

// Update an account by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAccount = await dbFunctions.updateAccount(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).send('Error updating account');
  }
});

// Create a new account
router.post('/', async (req, res) => {
  try {
    const newAccount = await dbFunctions.createAccount(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Error creating account');
  }
});

// Delete an account by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAccount = await dbFunctions.deleteAccount(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).send('Error deleting account');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { account, authToken } = await dbFunctions.loginAccount(req.body.id, req.body.password);
    res.status(200).json({ account, authToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).send('Invalid credentials'); // Unauthorized status for failed login
  }
}); 

module.exports = router;
