/**Resolvers are responsble for fetching the data for "EACH" field in the schema */

import {getJobs, getJob} from './db/jobs.js';
import {getCompany} from './db/companies.js'; // replace with actual company logic

export const resolvers = {
    Query:{
        /**root: often called parent or obj
         * represents the result returned from the resolver on the parent field
         * the args parameter has beed destructured to {id}         */
        job: (_root, {id}) => getJob(id),
            // console.log('[Query.job] args: ', id);   
        jobs: () => getJobs(),
    },

    Job: {
        // The important thing is that the database has exactly the same fields 
        // as defined in schema id, name and description
        // return getCompany() // replace with actual company logic
        company: (job) =>  getCompany(job.companyId),         
        
        // job argument see comment below
        date: (job) => {
            // console.log('resolving date for job: ', job);
            //  job.createdAt.slice(0, 'yyyy-mm-dd'.length); // replace with actual date logic
            return toIsoDate(job.createdAt)
        }
    }
};

// HELPER FUNCTION 
function toIsoDate(value){
    return value.slice(0, 'yyyy-mm-dd'.length)
}

/**job argument 
 * The job argument in the date resolver comes from the "parent" resolver that returns the job object.`
 * 
 * 1.)In GraphQL, resolvers are organized in "hierarchical" structure that mirrors the stucture of your GraphQL schema.
 * 
 * 2.)When a query is executed, GraphQL starts calling the top-level resolvers (in this case, the jobs resolver in the Query object)
 * 
 * 3.)The jobs resolver calls getJobs() which presumably returns an array of job objects.
 * 
 * 4.)For each job object in this array, GraphQL will then call the resolvers for any fields that are "explicitly defined in the Job
 *    object in your resolver map. 
 * 
 * 5.) In this case, you have a resolver for the date field of Job type.
 *     GraphQL automatically passes the parent object (the job object returned by GetJobs()) as the first argument to the date resolver.
 * 
 * NOTE
 * So the job argument is NOT explicitly passed by you in the code. 
 * It is automatically provided by the GraphQL execution engine when it calls the date resolver for each job object.
 */

/**ROOT FIELS AND RESOLVERS 
 * I.Understanding the Query Root Operation Type
     Think of it as the "main entrance" to your GraphQL API.
     In a GraphQL API, the Query root operation type is a SPECIAL object type that serves as the starting point for all your queries.
     It defines the top-level fields that you can query.

    Here's a simple analogy:
    Imagine a library. The library's main entrance is like the Query root operation type.
    Once you enter, you can access different sections (like fiction, non-fiction, or reference).
    These sections represent the fields of the Query type.

    A Concrete Example:
    Let's consider a simple e-commerce API. 
    
    The Query type might look like this:
    
    type Query {
        products(category: String): [Product]
        product(id: ID!): Product
        categories: [String]
    }

    In this example, the Query type has three fields:
    1.)products: This field allows you to fetch a list of products, optionally filtered by category.
    2.)product: This field allows you to fetch a specific product by its ID.
    3.)categories: This field returns a list of all available product categories.


    When you send a GraphQL query, you start by specifying the Query type and then drill down into the desired fields:
    This query will fetch all products in the "electronics" category and return their IDs, names, and prices.

    Key Points to Remember:
    1.)The Query type is the root of your GraphQL schema.
    2.)It defines the entry points for your API.
    3.)By traversing the fields of the Query type, you can access the underlying data.

    The Query type is often the only required root operation type in a GraphQL API.
    By understanding the concept of the Query root operation type, you can effectively design and query your GraphQL APIs 
    to fetch the exact data you need.

 * 
*/