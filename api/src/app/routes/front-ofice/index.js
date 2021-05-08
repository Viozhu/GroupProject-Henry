const express = require('express');

const router = express.Router();


const Upload = require('../../controllers/avatarUploadsController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


const walletController = require('../../controllers/walletController');

router.use('/wallet', walletController);

const customerController = require('../../controllers/customerController');
const walletControlelr = require('../../controllers/walletController');

router.use('/customer', customerController);
router.use('/wallet', walletControlelr);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

router.get('/form', Upload.displayForm);
router.post('/upload', multipartMiddleware, Upload.upload);

module.exports = router;
