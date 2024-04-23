const express = require('express');
const router = express.Router();

const authTokenFunctions = require('../dbFunctions/authTokenFunctions');
const dbFunctions = require('../dbFunctions/accountFunctions.js');
const jwtUtils =require( '../jwt/jwtUtils');


// Define user routes


router.get('/refreshToken', async (req, res) => {
  try {
    console.log('Cookies:', req.cookies);
    const refreshToken = req.cookies['Refresh-Token'];
    console.log('refreshToken:', refreshToken);
    const updatedToken = await authTokenFunctions.refreshToken(refreshToken);
    const authToken = jwtUtils.generateAuthToken(updatedToken.userId);
    const account = await dbFunctions.getAccountById(updatedToken.userId);
    res.cookie('Refresh-Token', updatedToken.token, {
      httpOnly: false,//true in production
      secure: false, // true in production
      path: '/'  // Set the path to root
      ,expires: new Date(updatedToken.expiryDate)
      
  });


    
    res.status(200).json({  authToken,updatedToken,account });
  } catch (error) {
      console.error('Refresh token error:', error);
      res.status(401).send('Refresh token error');
  }
});



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
    const account = await dbFunctions.updateAccount(req.params.id, req.body);

    res.status(200).json({account});
  } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).send('Error updating account');
  }
});



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
      httpOnly: false,
      secure: false,
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

router.delete('/:id', async (req, res) => {
  try {
    const deletedAccount = await dbFunctions.deleteAccount(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).send('Error deleting account');
  }
});

router.post('/:filter', async (req, res) => {

  try {

    const {accounts,count} = await dbFunctions.getAccountsByField(req.params.filter,req.body.value,req.body.limit,req.body.offset,req.body.order);
    console.log('account:', accounts, 'count:', count);
    res.status(200).json({rows: accounts ,count:count});

  } catch (error) {

      console.error('Error getting account:', error);

      res.status(500).send('Error getting account');

  }

}); 











// Export the router
module.exports = router;
