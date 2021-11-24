const user = require('../modules/userEndPoints');
const countries = require('../modules/countryEndPoints');
//const orders = require('../../modules/index_orders');


module.exports = function (app) {
    app.use("/user", user);
    app.use('/country',countries);
    //app.use('/orders',orders)
};