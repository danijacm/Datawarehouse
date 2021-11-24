
const {
    countryQueries
} = require('../model/countries');
const Response = require('../../clases/response');

const objCountry = {

    createCountry: async (req, res) => {
    
        const {country_data} = req.body;
        const {id, country, region_id} = country_data;

        try {
            const responseQuery = await countryQueries.insertNewCountry([id, country, region_id]);
            //console.log('responseQuery: ' + responseQuery);
            rta = new Response(false, 200, "Nuevo país creado exitosamente");
            res.status(200).send(rta)
        } catch (error) {
            //console.log('Error: ' + error);
            res.status(500).send(new Response(true, 500, "No fue posible crear el nuevo país", error));
        }
    },


    modifyCountry: async (req, res) => {
    
        const{country_data} = req.body;
        const {id, country, region_id} = country_data;

        try {
            const responseQuery = await countryQueries.updateCountry([country, region_id, id]);
            //console.log('responseQuery: ' + responseQuery);
            rta = new Response(false, 200, "País editado exitosamente");
            res.status(200).send(rta)
        } catch (error) {
            console.log('Error: ' + error);
            res.status(500).send(new Response(true, 500, "No fue posible editar el país", error));
        }
    },

}

module.exports = {
    objCountry
};