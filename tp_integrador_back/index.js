import express from "express";
import environments from "./src/api/config/environments.js";

const PORT = environments.port;
const app = express();
import connection from "./src/api/database/db.js";


app.get("/products", async (req, res) => {
    try{
        const sql = "SELECT * FROM products";
        const [rows] = await connection.query(sql);
        console.log(rows);
    } catch(error){
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

