const {Router} = require('express');
const auth = Router();
const loginHandler = require('../controllers/auth/login');
const signupHandler = require('../controllers/auth/signUp');

auth.post('/login', loginHandler);
auth.post('/signup', signupHandler);


module.exports = auth;