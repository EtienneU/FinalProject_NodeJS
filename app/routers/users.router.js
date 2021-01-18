const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../services/auth.services');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', auth, userController.getInfo);  // j'ajoute ici mon middleware 'auth'
router.post('/addInfo', auth, userController.createProfile);

module.exports = router;