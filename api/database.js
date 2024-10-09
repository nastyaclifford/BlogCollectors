import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sw5L711tPA40s",
  database: "blog",
});
