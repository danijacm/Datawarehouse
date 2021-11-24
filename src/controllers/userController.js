const {
    userQueries
} = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
//const crypto = require('bcryptjs');
const Response = require('../../clases/response');



const objUser = {
    loginUser: async (req, res) => {
        try {
            const {
                user,
                password
            } = req.body;
            
            const responseQuery = await userQueries.authenticateUser([user, password]);
            //console.log('responseQuery: ' + JSON.stringify(responseQuery));
            if (responseQuery.length == 0) {
                rta = new Response(true, 403, "Usuario o clave incorrecta", "");
                res.status(403).send(rta);
            } else {
                const token = jwt.sign({
                    usuario: user,
                    password: password
                },
                JWT_SECRET_KEY, {
                    expiresIn: '1h'
                }, {
                    algorithm: 'RS256'
                });
                if (responseQuery[0].change_pass === 0) {
                    rta = new Response(false, 203, "Login Exitoso, por favor cambie su clave", {
                        "user_id": responseQuery[0].id,
                        "profile": responseQuery[0].profile,
                        "Token": token
                    });
                    res.status(203).send(rta)
                } else {
                    rta = new Response(false, 200, "Login Exitoso", {
                        "user_id": responseQuery[0].id,
                        "profile": responseQuery[0].profile,
                        "Token": token
                    });
                    res.status(200).send(rta)
                }
            }
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No se puede obtener la consulta", error));
        }
    },


    changePassword: async (req, res) => {
        const {
            user_id,
            newPassword
        } = req.body;

        try {
            const change_pass = 1;
            const responseQuery = await userQueries.updatePassword([newPassword, change_pass, user_id]);
            rta = new Response(false, 200, "Cambio de clave exitoso!!!", "");
            res.status(200).send(rta)
        } catch (error) {
            console.log('Error: ' + error);
            res.status(500).send(new Response(true, 500, "No fue posible realizar el cambio de clave", error));
        }
    },

    createUser: async (req, res) => {
    
        const {
            user_data,
        } = req.body;

        const {
            name,
            lastname,
            email,
            profile,
            passw,
        } = user_data;

        try {
            const responseQuery = await userQueries.insertNewUser([name, lastname, email, profile, passw]);
            //console.log('responseQuery: ' + responseQuery);
            rta = new Response(false, 200, "usuario creado exitosamente", {
                "user_id": responseQuery[0]
            });
            res.status(200).send(rta)
        } catch (error) {
            ///console.log('Error: ' + error);
            res.status(500).send(new Response(true, 500, "No fue posible crear el usuario", error));
        }
    },

    deleteUserData: async(req,res) => {
        try {
            const {email} = req.body;
            const userData = await userQueries.getUserByEmail(email);
            await userQueries.deleteUser(email);
            res.status(200).send(new Response(false, 200, `El usuario ha sido eliminado correctamente`, userData));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible eliminar el usuario", error));
        }
    },    

    updateUserData: async(req,res) => {
        try {
            const {user_data} = req.body;
            const {name, lastname, email, profile_id, passw} = user_data;
            //console.log(name + '-' + lastname + '-' + email + '-' + profile_id +  '-' + passw);
            await userQueries.updateUser([name, lastname, email, profile_id, passw, email]);
            res.status(200).send(new Response(false, 200, `El usuario ha sido actualizado correctamente`));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible actualizar el usuario", error));
        }
    }, 

}

module.exports = {
    objUser
};