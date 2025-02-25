/**The .js is included for local module imports
 * This is because when using ES modules in Node.js, we need to specify the "full filename",
 * including the extension, for locale module imports.
 * 
 * The reason for this is that ES modules in Nodejs require "explicit" file extensions for 
 * better performance and clarity.
 */

/**APOLLO SERVER
 * --is an open-source, production-ready "GraphQL server framework".
 * --It provides a robust foundation for building and managing GraphQL APIs. 
 */
import {ApolloServer} from '@apollo/server';
// cors package which helps manage Cross-Origin Resource Sharing(CORS).
import cors from 'cors';
/**This import statement is used to "integrate" Apollo server with Express.js,
 * allowing Apollo Server to handle GraphQl requests in an Express.js
 * ->> It takes an instance of Apollo Server as an argument and returns an Express.js
 * middleware function.
 * This middleware function can be used in an Express.js application to handle
 * GraphQL requests. 
 */
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

// Read schema file async
/**This means that the server can start reading the file in the background while it continues to execute other code. 
  This can lead to better performance and responsiveness, especially if the file is large or if the disk is slow. */
const typeDefs = await readFile('./schema.graphql', 'utf-8');

// CREATE APOLLO SERVER
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
