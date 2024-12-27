import { GraphQLClient, gql } from "graphql-request";

// CREATING A GRAPHQL client instance.
const client = new GraphQLClient('http://localhost:9000/graphql');

// FETCH SPECIFIC DATA
export async function getJob(id){
  const query = gql`
    query JobById($id: ID!) {
      job(id)
      id
      date
      title
      company{
        id
        name
      }
      description
    }
  `;

}


// FETCH ALL DATA (JOBS) 
export async function getJobs() {
    // this is a graphQL query
    /**the gql tag  function is commonly used with GraphQL libraries
     * (like Apollo client or graphql-request) to "parse" graphql query
     * strings. 
     * It helps with syntax highlighting in some IDEs and can be used
     * for "query validation" and other optimizations. 
     * It tells the VS code that this is a graphQL query.
     */
    const query = gql`  
    query{
        jobs{
          id
          date
          title
          company{
            id
            name
          }
        }
    }`;
    //the "request" method came from graphql-request library
    const {jobs} = await client.request(query);
    return jobs;
}