const express = require('express');
const router = express.Router();

const followingsController = require('../controllers/followingsController');

// Takip edilen hesapların listesini göstermek için yönlendirme
router.get('/', followingsController.showFollowingsList);

// Takip edilmeyen hesapları takipten çıkarmak için yönlendirme
router.get('/unfollow', followingsController.unfollowNonFollowers);

module.exports = router;
