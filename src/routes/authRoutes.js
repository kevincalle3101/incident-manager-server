const {Router} = require('express');
const auth = Router();
const loginHandler = require('../controllers/auth/login');
const signupHandler = require('../controllers/auth/signUp');

auth.post('/signup', signupHandler);
auth.post('/login', loginHandler);

module.exports = auth;