const express = require('express');
const router = express.Router();
const dbFunctions = require('../dbFunctions/partnerAccountFunctions');

// Define user routes
router.get('/:id', async (req, res) => {
  try {
      const partnerAccount =await dbFunctions.getPartnerAccountById(req.params.id);
      if (!partnerAccount) {
          return res.status(404).send('partnerAccount not found');
      }


      res.status(200).json(partnerAccount);
  } catch (error) {
      console.error('Error getting partnerAccount:', error);
      res.status(500).send('Error getting partnerAccount');
  }
});

router.get('/', async (req, res) => {
  try {
      const partnerAccounts = await dbFunctions.getAllPartnerAccounts();
      res.status(200).json(partnerAccounts);
  } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(500).send('Error getting accounts');
  }
});

router.put('/:id', async (req, res) => {
  try {
      const updatedAccount = await dbFunctions.updatePartnerAccount(req.params.id, req.body);

      res.status(200).json(updatedAccount);
  } catch (error) {
      console.error('Error updating partnerAccount:', error);
      res.status(500).send('Error updating partnerAccount');
  }
});


router.put('/passwordReset/:id', async (req, res) => {
  try {
    const updatedAccount = await dbFunctions.resetPassword(req.params.id, req.body.password);
    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Error resetting password');
  }
});

router.post('/', async (req, res) => {
  try {
    const emailExists = await dbFunctions.findPartnerAccountByEmail(req.body);
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }
    const usernameExists = await dbFunctions.findPartnerAccountByUsername(req.body);
    if (usernameExists) {
        return res.status(400).send('Username already exists');
    }
    const newAccount = await dbFunctions.createPartnerAccount(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating partnerAccount:', error);
    res.status(500).send('Error creating partnerAccount');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAccount = await dbFunctions.deletePartnerAccount(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
    console.error('Error deleting partnerAccount:', error);
    res.status(500).send('Error deleting partnerAccount');
  }
});

module.exports = router;