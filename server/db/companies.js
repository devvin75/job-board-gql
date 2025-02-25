/**The connection object is assumed to be an established database connection
 * (likely using a library like Knex.js, Sequelize, or similar).
 *  It's the gateway to interacting with the database. */
import { connection } from './connection.js';

/**Creates a helper function getCompanyTable that points to the "company" table 
 * in the database 
 * Think of this like telling the code which filing cabinet (table) to look in 
 * for company information
 */
const getCompanyTable = () => connection.table('company');

/**1.)This function's purpose is to find and return a single company's information 
 * from the database
 * 2.)It takes an id parameter (like a unique identifier for each company)
 * 3.)The where({ id }) part is like saying "find me the entry where the ID matches 
 * what I'm looking for" first() ensures it only gets one result (the first match) */
export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}
