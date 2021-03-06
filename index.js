'use strict'
//modulos
const frankify = require('./frankify')
const routes = require('./routes/public')
const routesPrivate = require('./routes/private')
const config = require('./config')


//config body-parser
frankify.bodyParserUrl({extended:false});
frankify.bodyParserJson();

//config method-override
frankify.methodOverride('_method')

//config the cors
frankify.cors();

//config static files
//frankify.staticFiles('/app')

//function files upload
//frankify.fileUploads({ keepExtensions: true, uploadDir: 'uploads' })

// routes
frankify.routesPublic('/', routes)
frankify.routesPrivates('/app', routesPrivate)

// connection database
frankify.dbConnection(config.db.connection);

// server
frankify.server(config.port);