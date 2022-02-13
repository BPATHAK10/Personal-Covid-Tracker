import pkg from "pg";
const { Pool } = pkg;  // workaround to import Pool using ES6

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'covid',
    password: 'postgres',
    port: 5432,
});

// module.exports = {
//   pool
// }

export default pool