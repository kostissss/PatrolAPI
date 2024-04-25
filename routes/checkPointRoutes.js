const express = require('express');
const router = express.Router();

const dbFunctions = require('../dbFunctions/checkPointsFunctions.js');




router.put('/updateMultipleCheckPoints', async (req, res) => {

    try {
  
      const guards = await dbFunctions.updateMultipleCheckPoints(req.body);
  
      res.status(200).json(guards);
  
    } catch (error) {
        
          console.error('Error updating checkPoints:', error);
    
          res.status(500).send(error);
    
      }
  
  });


router.get('/', async (req, res) => {
    try {
        const checkPoints = await dbFunctions.getAllCheckPoints();
        res.status(200).json(checkPoints);
    } catch (error) {
        console.error('Error getting checkPoints:', error);
        res.status(500).send('Error getting checkPoints');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const checkPoint =await dbFunctions.getCheckPointById(req.params.id);
        res.status(200).json(checkPoint);
    } catch (error) {
        console.error('Error getting checkPoint:', error);
        res.status(500).send('Error getting checkPoint');
    }
});


router.post('/', async (req, res) => {
    try {
        const newCheckPoint =await dbFunctions.createCheckPoint(req.body);
        res.status(201).json(newCheckPoint);
    } catch (error) {
        console.error('Error creating checkPoint:', error);
        res.status(500).send('Error creating checkPoint');
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedCheckPoint = await dbFunctions.updateCheckPoint(req.params.id, req.body);

        res.status(200).json(updatedCheckPoint);
    } catch (error) {
        console.error('Error updating checkPoint:', error);
        res.status(500).send('Error updating checkPoint');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedCheckPoint =await dbFunctions.deleteCheckPoint(req.params.id);
        res.status(200).json(deletedCheckPoint);
    } catch (error) {
        console.error('Error deleting checkPoint:', error);
        res.status(500).send('Error deleting checkPoint');
    }
});

router.post('/:filter', async (req, res) => {

    try {
  
      const guard = await dbFunctions.getCheckPointsByField(req.params.filter,req.body.value);
  
      res.status(200).json(guard);
  
    } catch (error) {
  
        console.error('Error getting guard:', error);
  
        res.status(500).send('Error getting guard');
  
    }
  
  }); 
  



module.exports = router;


