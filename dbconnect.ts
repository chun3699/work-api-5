import mysql from "mysql";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "sql6.freemysqlhosting.net",
  user: "sql6689800",
  password: "PMWutYUxiX",
  database: "sql6689800",
});