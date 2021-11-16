const express = require('express');
const router = express.Router();
const {objUser} = require('../controllers/userController');
const {objUserMiddle} = require('../middlewares/user/userMiddle');
const {
    validateLogin,
    validChangNewPassReq,
    validCreateUserReq
} = require('../validators/userValidator');

router.get('/login', validateLogin, objUser.loginUser);
router.put('/change-password', validChangNewPassReq, objUser.changePassword);
router.post('/create', validCreateUserReq, objUserMiddle.validateProfile, objUserMiddle.validateDatosUser, objUser.createUser);



module.exports = router;