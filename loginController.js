const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const loggedInUser = await login(username, password);
    res.redirect(`/followings/${loggedInUser.pk}`);
});

module.exports = router;
