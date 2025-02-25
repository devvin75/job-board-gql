import { connection } from './connection.js';
import { generateId } from './ids.js';

const getJobTable = () => connection.table('job');

export async function getJobs() {
  return await getJobTable().select();
}
/**The selected code snippet is part of the jobs.js file in the GraphQL job board server codebase.
 * It defines an asynchronous function called getJob that retrieves a single job from the database
 * based on the provided id.

Here's a breakdown of the code:
1.The function getJob is exported, making it accessible to other parts of the codebase.
2.The function takes an id parameter, which represents the unique identifier of the job to be retrieved.
3.Inside the function, the getJobTable function is called to obtain a reference to the 'job' table in the database.
4.The first method is then chained to the result of getJobTable(), indicating that only the first matching record should be returned.
5.The where method is used to filter the records based on the provided id.
6.The await keyword is used before calling getJobTable().first().where({ id }) to ensure that the database query is executed 
  asynchronously and the result is returned to the caller.
7.Finally, the retrieved job object is returned from the getJob function.


This code snippet demonstrates how to retrieve a "single" job from the database using the provided id */
export async function getJob(id) {
  return await getJobTable().first().where({ id });
}
/**This code snippet demonstrates how to retrieve all jobs associated with a specific company 
 * from the database using the provided companyId. */
export async function getJobsByCompany(companyId){
  return await getJobTable().select().where({companyId})
}

export async function createJob({ companyId, title, description }) {
  const job = {
    id: generateId(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  await getJobTable().insert(job);
  return job;
}

export async function deleteJob(id) {
  const job = await getJobTable().first().where({ id });
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  await getJobTable().delete().where({ id });
  return job;
}

export async function updateJob({ id, title, description }) {
  const job = await getJobTable().first().where({ id });
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  const updatedFields = { title, description };
  await getJobTable().update(updatedFields).where({ id });
  return { ...job, ...updatedFields };
}
