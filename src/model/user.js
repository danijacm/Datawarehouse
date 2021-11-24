const sequelize = require('../../database/conection');

const userQueries = {

    /*=== QUERIES A LA TABLA USERS ===*/

    //Consulta un usuario por sus credenciales
    authenticateUser: (dataLogin) => {
        return sequelize.query(`select u.id, u.name, u.lastname, u.email, u.passw, u.change_pass, p.profile from users u 
                                join profiles p on (u.profile_id = p.id) WHERE email = ? and passw = ?`, {
            type: sequelize.QueryTypes.SELECT,
            replacements: dataLogin
        })
    },

    //Actualiza el passwod de un usuario y el campo change_pass en la BD
    updatePassword: (dataLogin) => {
        return sequelize.query('UPDATE users SET passw = ?, change_pass = ? WHERE id = ?', {
            type: sequelize.QueryTypes.UPDATE,
            replacements: dataLogin
        })
    },

    //Agrega un nuevo usuario a la BD
    insertNewUser: (userData) => {
        return sequelize.query('INSERT INTO users (name, lastname, email, profile_id, passw) VALUES(?,?,?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: userData
        })
    },

    //Obtener perfil de un usuario
    getProfile: (user_id) => {
        return sequelize.query('SELECT profile_id FROM users WHERE id = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [user_id]
        })
    },

    //Obtiene el email idicado desde el front
    getEmail: (email) => {
        return sequelize.query('SELECT email FROM users WHERE email = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [email]
        })
    }, 
    
    // Obtiene la información de un usuario a través de su email
    getUserByEmail: (email) =>{
        return sequelize.query('SELECT * FROM users WHERE email=?',{
            type: sequelize.QueryTypes.SELECT,
            replacements: [email]
        });
    },  

    // Eliminacion de un usuario (empleado) del sistema
    deleteUser: (email) =>{
        return sequelize.query('DELETE FROM users WHERE email = ?',{
            type: sequelize.QueryTypes.DELETE,
            replacements: [email]
        });
    }, 
    
    // Actualiza la información de un usuario
    updateUser: (email) => {
        return sequelize.query('UPDATE users SET name = ?, lastname = ?, email = ?, profile_id = ?, passw = ? WHERE email = ?',{
        //return sequelize.query(`UPDATE users SET ${userData} WHERE email = ?`,{
            type: sequelize.QueryTypes.PUT,
            replacements: email
        });
    },    
};



module.exports = {
    userQueries
}