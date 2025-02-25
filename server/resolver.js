/**Resolvers are responsble for fetching the data for "EACH" field in the schema */

import {getJobs, getJob, getJobsByCompany} from './db/jobs.js';
import {getCompany} from './db/companies.js'; // replace with actual company logic

export const resolvers = {
    Query:{
        /**root parameter in GraphQL contains the result from the parent resolver.
         * the args argument has beed destructured to {id}         */
        job: (_root, {id}) => getJob(id),           
        jobs: () => getJobs(),
        
        /**The company field under Job is for retrieving the associated company when 
         * you already have a Job object. 
         * It's used when you're traversing from a job to its company.
         * -------------------------------------------------------------------
         * The company query in the Query type is for directly looking up a company 
         * by its ID, without needing to go through a job first. 
         * 
         * This is useful when you:
         * 1.)Need to fetch company details DIRECTLY without having a job reference
         * 2.)Want to get company information independently
         * 3.)Need to build UI components that focus on company details only */
        company: (_root, {id}) => getCompany(id)        
    },

    Company: {
        jobs: (company) =>  getJobsByCompany(company.id)
        },        
    

    Job: {
        // The important thing is that the database has exactly the same fields 
        // as defined in schema id, name and description
        /**This is what the arg should look like parent or root
         * company: (parent) => {
            // parent is the Job object
            // parent.companyId can be used to fetch the company
            // return getCompany(parent.companyId) 
            
            In GraphQL, when you have nested fields, the parent field's resolved value
             becomes available as the first argument 
             (commonly known as the parent or source argument) to the child field's resolver.  
            Ex:
            query {
              job {
                id
                title
                company {
                  name
                }
              }
            }
            1.)A parent resolver would resolve the job field, return a job object
            2.)Then the company resolver "receives" that job object as it's first argument
            3.)The resolver uses job.companyId to fetch the associated company 
               using the getCompany function. 

             // console.log('job value:', job)
            job parameter value:
            job value: {
                id: 'f3YzmnBZpK0o',
                companyId: 'FjcJCHJALA4i',
                title: 'Frontend Developer',
                description: 'We are looking for a Frontend Developer familiar with React.',
                createdAt: '2024-01-26T11:00:00.000Z' **/
        company: (job) => getCompany(job.companyId), 
                 
        
        // job argument see comment below
        date: (job) => {           
            //  job.createdAt.slice(0, 'yyyy-mm-dd'.length); // replace with actual date logic
            return toIsoDate(job.createdAt)
        }
    }
};

// HELPER FUNCTION 
function toIsoDate(value){
    return value.slice(0, 'yyyy-mm-dd'.length)
}

/**ARGUMENTS HANDLING
 * Resolvers can process arguments passed in queries
 * 
 * Each resolver function receives four arguments
 * 1.)parent
 *    --the result of the previous resolver call
 * 2.)args
 *    --the arguments provided to the field
 * 3.)context
 *    --a shared context object(often contains authentication info,database connections)
 * 4.)info
 *    --information about the execution state of the query.
 * 
 * Every resolver function receives four arguments in this order:
 *  fieldResolver(parent, args, context, info) {
        // resolver implementation
    }

    KEYPOINT
    --argument must be defined in the schema before you can use them


 */

