const express = require('express');
const router = express.Router();
const PartnerAccount = require('../models/partnerAccount');
const db = require('../models');
const bcrypt = require('bcryptjs'); // Import bcryptjs


// Define user routes
router.get('/:id', async (req, res) => {
  try {
      const partnerAccount = await db.PartnerAccount.findByPk(req.params.id,{
        attributes : { exclude: ['password'] }
      });
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
      const partnerAccount = await db.PartnerAccount.findAll({attributes : { exclude: ['password'] }});
      res.status(200).json(partnerAccount);
  } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(500).send('Error getting accounts');
  }
});

router.put('/:id', async (req, res) => {
  try {
      const partnerAccount = await db.PartnerAccount.findByPk(req.params.id);
      
      if (!partnerAccount) {
          return res.status(404).send('PartnerAccount not found');
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const accountData = { ...req.body, password: hashedPassword };


      await partnerAccount.update(accountData);

      res.status(200).json(partnerAccount);
  } catch (error) {
      console.error('Error updating partnerAccount:', error);
      res.status(500).send('Error updating partnerAccount');
  }
});

router.put('/passwordReset/:id', async (req, res) => {
    try {
      const partnerAccount = await db.PartnerAccount.findByPk(req.params.id);
      
      if (!partnerAccount) {
        return res.status(404).send('PartnerAccount not found');
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Update only the password field
      await partnerAccount.update({ password: hashedPassword });
  
      res.status(200).json(partnerAccount);
    } catch (error) {
      console.error('Error updating partnerAccount:', error);
      res.status(500).send('Error updating partnerAccount');
    }
  });
  



router.post('/', async (req, res) => {
  try {
    console.log('Received password:', req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const accountData = { ...req.body, password: hashedPassword };
    const newAccount = await db.PartnerAccount.create(accountData);
    res.status(201).json(newAccount);
} catch (error) {
    console.error('Error creating partnerAccount:', error);
    res.status(500).send('Error creating partnerAccount');
}
});



router.delete('/:id', async (req, res) => {
  try {
      const partnerAccount = await db.PartnerAccount.findByPk(req.params.id);
      if (!partnerAccount) {
          return res.status(404).send('partnerAccount not found');
      }

      await partnerAccount.destroy();
      res.status(200).json(partnerAccount);
  } catch (error) {
      console.error('Error deleting partnerAccount:', error);
      res.status(500).send('Error deleting partnerAccount');
  }
});

// Export the router
module.exports = router;
