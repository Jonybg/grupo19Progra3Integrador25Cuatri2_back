import mysql from "mysql2"
import environments from "../config/environments.js"


const {database} = environments;

const connection = mysql.createPool({
    host: database.host,
    database : database.name,
    user: database.user,
    password: database.password
});


export default connection;
