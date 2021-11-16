const {
    userQueries
} = require('../../model/user');
const Response = require('../../../clases/response');

const objUserMiddle = {
    validateProfile: async (req, res, next) => {

        const {
            user_id,
        } = req.body;

        try {
            const responseQuery = await userQueries.getProfile(user_id);
            if( responseQuery[0].profile === 'ADMIN'){
                next();
            }
            else{
                rta = new Response(true, 403, `El usuario no tiene privilegios de administrador`);
                res.status(403).send(rta);
            }

        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible crear el usuario", error));
        }
    },

    validateDatosUser: async (req, res, next) => {
        const {new_user} = req.body;
        const {name, lastname, email, profile, passw} = new_user;
        const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let error = false;
        /*console.log('Entro a validateDatosUser');
        console.log( name + '-' + lastname + '-' + email + '-' + profile + '-' + passw);*/

        if(name == null || lastname == null || email == null || profile == null || passw == null){    
             error = true;
        }
        else if(name.length <= 0 || lastname.length <= 0 || email.length <= 0 || profile.length <=0 ||
                passw.length <= 0){
            error = true;
        }
        else if(emailValidation.test(email) === false){
             res.status(400).send(new Response(true, 400, "El campo email no tiene el formato correcto", ""))
        }

        try {
            const emailQuery = await userQueries.getEmail(email);
            console.log('emailQuery: ' + emailQuery);
            if(emailQuery.length > 0){
                res.status(409).send(new Response(true, 409, `El email ${email} ya se encuatra registrado`, ''));
            } 
        } 
        catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible crear el usuario", error));
        }
        if (error){
            res.status(400).send(new Response(true, 400, "Verifique que todos los campos esten presenntes y tengan el formato correcto", error));
        }
        else{
            next();
        }
    }
}

module.exports = {
    objUserMiddle
};