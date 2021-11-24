const express = require('express');
const router = express.Router();
const {objCountry} = require('../controllers/countryController');
const {objUserMiddle} = require('../middlewares/user/userMiddle');
/*const {
    validateLogin,
    validChangNewPassReq,
    validCreateUserReq,
    validaDeleteReq,
    validaUpdateReq
} = require('../validators/userValidator');*/

router.post('/create', objUserMiddle.validateProfile, objCountry.createCountry);
router.put('/update', objUserMiddle.validateProfile, objCountry.modifyCountry);


module.exports = router;