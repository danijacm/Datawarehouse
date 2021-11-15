const {check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelper');

// Validaciones para el request del login
const validateLogin = [
    check('user', 'El campo user debe estar prdente y tener el formato correcto')
        .exists()
        .isEmail()
        .not()
        .isEmpty(),
    check('password', 'El campo password debe estar presente y tener el formato correcto')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }    
]

// Validaciones para el request de cambio de clave  
const validChangNewPassReq = [
    check('user_id', 'El Campo user_id debe estar prsente y tenrr el formato correcto')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),
    check('newPassword', 'El campo newPassword debe estar presente y tener el formato correcto')
        .exists()
        .isStrongPassword()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }    
]

const validCreateUserReq = [
    check('user_id', 'El Campo user_id debe estar presente y tener el formato correcto')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),
    check('new_user', 'El campo new_user debe estar presente y debe ser un objeto JSON')
        .exists()
        .isJSON(),

    (req, res, next) => {
        validateResult(req, res, next)
    }    
]

module.exports = {
    validateLogin,
    validChangNewPassReq,
    validCreateUserReq
}