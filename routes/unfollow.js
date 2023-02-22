const express = require('express');
const router = express.Router();

const unfollowController = require('../controllers/unfollowController');

// Takip edilmeyen hesapları takipten çıkarmak için yönlendirme
router.get('/', unfollowController.unfollowNonFollowers);

module.exports = router;
