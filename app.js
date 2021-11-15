require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const routes = require('./src/routes/routes');
const globalMiddlewares = require('./src/middlewares/globalMiddle');
const app = express();


//GLOBAL MIDDLEWARES
globalMiddlewares(app);

//ROUTES
routes(app);

//PORT LISTEN
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));