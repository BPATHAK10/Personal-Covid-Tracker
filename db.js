import pkg from "pg";
const { Pool } = pkg;  // workaround to import Pool using ES6

var pool; 
if(process.env.NODE_ENV === "production") {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true 
    })
}
else{

    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'covid',
        password: 'postgres',
        port: 5432,
    });
}

// module.exports = {
//   pool
// }

export default pool