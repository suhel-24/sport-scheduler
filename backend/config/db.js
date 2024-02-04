const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "7989",
});

module.exports=pool