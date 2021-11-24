const sequelize = require('../../database/conection');

const countryQueries = {

    //Agrega un nuevo país en la BD
    insertNewCountry: (countryData) => {
        return sequelize.query('INSERT INTO countries (id, country, region_id) VALUES(?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: countryData
        })
    },

    // Actualiza la información de un país en la BD
    updateCountry: (countryData) => {
        return sequelize.query('UPDATE countries SET country = ?, region_id = ? WHERE id = ?',{
            type: sequelize.QueryTypes.PUT,
            replacements: countryData
        });
    },  

};


module.exports = {
    countryQueries
}