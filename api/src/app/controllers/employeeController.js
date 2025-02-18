const express = require('express');
const checkIfLoggedIn = require('../auth/authorizeMiddleware');

const router = express.Router();

router.get('/', checkIfLoggedIn, (req, res) => {
  res.json({ message: 'employee root GET response' });
});

module.exports = router;
