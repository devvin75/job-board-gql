/**The .js is included for local module imports
 * This is because when using ES modules in Node.js, we need to specify the "full filename",
 * including the extension, for locale module imports.
 * 
 * The reason for this is that ES modules in Nodejs require "explicit" file extensions for 
 * better performance and clarity.
 */

import {ApolloServer} from '@apollo/server';
// cors package which helps manage Cross-Origin Resource Sharing(CORS).
import cors from 'cors';
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4'
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import {resolvers} from './resolver.js'
import {readFile} from 'node:fs/promises'

const PORT = 9000;

const app = express();

//Defines middleware functions that will be executed for every incoming request to the server
// It lets you add custom functions to process requests and responses, ensuring that 
// the app works as expected and stays secure.
app.use(cors(), express.json(), authMiddleware);

// Defines a route for handling 
app.post('/login', handleLogin);

// Read schema file
const typeDefs = await readFile('./schema.graphql', 'utf-8');

// Create Apollo Server
const apolloServer = new ApolloServer({typeDefs, resolvers});

// A method in Apollo Server that initiates the server and begins listening for incoming GraphQL requests
// Essentially starts the GraphQL API
await apolloServer.start();

/**Express will send all requests for the "/graphql" to the "apolloMiddleware" so they will be handled
 * by the Apollo GraphQL engine. */
app.use('/graphql', apolloMiddleware(apolloServer));



app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
