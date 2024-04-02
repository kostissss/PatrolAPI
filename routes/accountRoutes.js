const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const dbFunctions = require('../dbFunctions/accountFunctions');
=======

const authTokenFunctions = require('../dbFunctions/authTokenFunctions');
const dbFunctions = require('../dbFunctions/AccountFunctions');
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529

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
    const emailExists = await dbFunctions.findAccountByEmail(req.body);
    console.log(req.body)
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
<<<<<<< HEAD
    res.status(500).send('Error creating account');
  }
});

// Delete an account by ID
=======
    res.status(500).send(error);
}
});





router.post('/login', async (req, res) => {
  try {
    // const userNameExists = await dbFunctions.findAccountByUsername(req.body);
    // if (!userNameExists) {
    //     return res.status(400).send('Username does not exist');
    // }
    const { account, authToken,refreshToken } = await dbFunctions.loginAccount(req.body);
    res.cookie('Refresh-Token', refreshToken.token, {
      httpOnly: true,
      secure: true,
      path: '/'  // Set the path to root
      ,expires: new Date(refreshToken.expiryDate)
      
  });
    console.log('account:', account, 'authToken:', authToken, 'refreshToken:', refreshToken);
    res.status(200).json({ account, authToken,refreshToken });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Error logging in');
  }
}); 

router.delete('/logout', async (req, res) => { // to revoke or to delete a refresh token ?
  try {
    console.log('Cookies:', req.cookies);
    const refreshToken = req.cookies['Refresh-Token'];
    console.log('refreshToken:', refreshToken);
    const deletedToken = await authTokenFunctions.deleteRefreshToken(refreshToken);
    res.clearCookie('Refresh-Token');
    res.status(200).json(deletedToken);
  } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send('Error logging out');
  }
});

>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
router.delete('/:id', async (req, res) => {
  try {
    const deletedAccount = await dbFunctions.deleteAccount(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).send('Error deleting account');
  }
});

<<<<<<< HEAD
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
=======
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529

module.exports = router;
