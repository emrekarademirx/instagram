const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

// Giriş sayfasını göstermek için yönlendirme
router.get('/', loginController.getLoginPage);

// Kullanıcı girişi yapmak için yönlendirme
router.post('/', loginController.loginToInstagram);

module.exports = router;
