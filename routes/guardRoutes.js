const express = require('express');
const router = express.Router();

const dbFunctions = require('../dbFunctions/guardsFunctions');


// Define user routes


router.put('/updateMultipleGuards', async (req, res) => {

  try {

    const guards = await dbFunctions.updateMultipleGuards(req.body);

    res.status(200).json(guards);

  } catch (error) {
      
        console.error('Error updating guards:', error);
  
        res.status(500).send(error);
  
    }

});

router.get('/:id', async (req, res) => {
  try {
      const guard =await dbFunctions.getGuardById(req.params.id);
      if (!guard) {
          return res.status(404).send('guard not found');
      }

      console.log('guard2:', guard);
      res.status(200).json(guard);
  } catch (error) {
      console.error('Error getting guard:', error);
      res.status(500).send('Error getting guard');
  }
});

router.get('/', async (req, res) => {
  try {
    const guard =await dbFunctions.getAllGuards();
    res.status(200).json(guard);
  } catch (error) {
      console.error('Error getting guards:', error);
      res.status(500).send('Error getting guards');
  }
});








router.put('/:id', async (req, res) => {
  try {
    const guard = await dbFunctions.updateGuard(req.params.id, req.body);

    res.status(200).json({guard});
  } catch (error) {
      console.error('Error updating guard:', error);
      res.status(500).send('Error updating guard');
  }
});



router.post('/', async (req, res) => {
  try {
    
    const newGuard = await dbFunctions.createGuard(req.body);
    res.status(201).json(newGuard);
} catch (error) {
    console.error('Error creating guard:', error);
    res.status(500).send(error);
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



router.post('/:filter', async (req, res) => {

  try {

    const guard = await dbFunctions.getGuardsByField(req.params.filter,req.body.value);

    res.status(200).json(guard);

  } catch (error) {

      console.error('Error getting guard:', error);

      res.status(500).send('Error getting guard');

  }

}); 











// Export the router
module.exports = router;
