const {check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelper');

// Validaciones para el request del login
const validateLogin = [
    check('user', 'El campo user debe estar presente y tener el formato correcto')
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
    check('user_data', 'El campo new_user debe estar presente y debe ser un objeto')
        .exists(),

    (req, res, next) => {
        validateResult(req, res, next)
    }    
]


const validaDeleteReq = [
    check('user_id', 'El campo user debe estar presente y tener el formato correcto')
        .exists()
        .not()
        .isEmpty(),
    check('email', 'El campo email debe estar presente y tener el formato correcto')
        .exists()
        .isEmail()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }    
]

const validaUpdateReq = [
    check('user_id', 'El campo user debe estar presente y tener el formato correcto')
        .exists()
        .not()
        .isEmpty(),
    check('user_data', 'El campo user_data debe estar presente y debe ser un objeto')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }    
]

module.exports = {
    validateLogin,
    validChangNewPassReq,
    validCreateUserReq,
    validaDeleteReq,
    validaUpdateReq
}