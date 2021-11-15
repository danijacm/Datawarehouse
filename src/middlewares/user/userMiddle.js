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
}

module.exports = {
    objUserMiddle
};