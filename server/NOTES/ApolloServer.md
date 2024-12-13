ExpressJS 
--is a general-purpose web framework that provide tools for handling: 
1.)HTTP requests and responses
2.)Routing requests to specific handlers 
3.)Working with middleware.

Apollo Server
--is specifically designed for building GraphQL APIs.

--built on top of Express.js (or other NOde.js frameworks) to provide 
  a higher-level abstraction fro handling GraphQL queries, mutations,
  and subscriptions. 


start() method
--in Apollo server it initiates the server and begins listening for incoming GraphQL requests.
  it is essentially starts the GraphQL API

--it asynchronous, meaning it returns a Promise

--returns a "Server Instance"
  which can use to access information about the server, such as its URL or configuration.

NOTE:
 an instance of Apollo Server is createdd with the define typeDefs(Schema) and resolvers.

   const server = new ApolloServer({ typeDefs, resolvers  });
