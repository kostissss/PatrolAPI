const express = require('express');
const router = express.Router();


// Define user routes
router.get('/partner', (req, res) => {
  res.send('GET /sign-up');
});

router.post('/', (req, res) => {
  res.send('POST /sign-up');
});

// Export the router
module.exports = router;
