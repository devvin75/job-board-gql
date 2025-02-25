import knex from 'knex';

/**Knex is used to establish a connection to a SQLite3 database. 
 * The knex function is called with an object that contains the configuration settings 
 * for the database connection.

    1.)client: 'better-sqlite3': 
       Specifies the database client to use. 
       In this case, it's set to 'better-sqlite3', which is a lightweight, feature-rich 
       SQLite3 client for Node.js.

    2.)connection: { filename: './data/db.sqlite3' }: 
       Specifies the connection details for the SQLite3 database. 
       In this case, the database file is located at './data/db.sqlite3'.

    3.)useNullAsDefault: true: 
       Configures Knex to treat NULL values as default values when inserting or updating records. */
export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});
