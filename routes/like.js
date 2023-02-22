const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

// Anasayfa gönderilerini beğenmek için yönlendirme
router.get('/', likeController.likeHomepagePosts);

module.exports = router;
