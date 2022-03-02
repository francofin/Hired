const fs = require('fs');
const app = require('./app');
const https = require('https');
const http = require('http');
const db = require('./config/connection');
const {resolvers, typeDefs} = require('./schemas');
const {ApolloServer} = require('apollo-server-express');

require('dotenv').config();

const PORT = process.env.PORT || 8001;

const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'hired.com' },
    development: { ssl: false, port: 8000, hostname: 'localhost' },
  };

const environment = 'development';
const config = configurations[environment];

db.once('open', () => {
    console.log('Mongose Connected')
});

let server;
console.log(config.ssl)

async function startServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    
    

    if(config.ssl){
        server = https.createServer({
            cert:fs.readFileSync('cert.pem'),
            key:fs.readFileSync('key.pem'),}, {app});
    }
    else{
        server = http.createServer(app);
    }
    

    await db;

    server.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
        console.log(`Server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
}


startServer();

