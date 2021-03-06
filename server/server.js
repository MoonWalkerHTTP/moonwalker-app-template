// Dependencies
require('dotenv').config(); 
const express = require('express'); 
const morgan = require('morgan'); 
const helmet = require('helmet'); 
const cors = require('cors'); 
const pug = require('pug'); 
const chalk = require('chalk'); 
const consola = require('consola'); 

// Loading up Config File
const config = require('../config/serverConfig.json'); 

// Loading up Routes File
const routes = require('../config/routes.json');

// Initializing Application
const app = express(); 

// Middlewares
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(cors()); 
app.use('/css', express.static('./css')); 
app.use('/js', express.static('./js'));

// Routes 
app.get('/activeRoutes', (req,res) => {
     res.json(routes);
}); 

routes.forEach(route => {
     const id = route.id, 
     description = route.description, 
     Route = route.route, 
     renderFile = route.renderFile;

     // GET Routes
     app.get(`${Route}`, (req,res) => {
          res.send(pug.renderFile(`./app${renderFile}`)); 
     }); 
});

// Firing up Application
const port = config.port; 
app.listen(port, () => {
     console.log(chalk.blueBright('===== MoonWalker App =====')); 
     consola.success(chalk.greenBright(`MoonWalker Server Running on Port ${port}`));
     console.log(chalk.greenBright('-> Visit \'/activeRoutes\' to see all the available routes')); 
     console.log(chalk.blueBright('-> Request Logs - ')); 
}); 