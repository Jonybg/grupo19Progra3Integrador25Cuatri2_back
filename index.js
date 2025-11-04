import express from "express"
const app = express();
import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js";
import cors from "cors";

app.use(cors())
app.use(express.json())
const PORT = environments.port;




app.get("/products", async (req,res)=>{
    try {
        const sql =  `SELECT * FROM productos`;
        const [rows] = await connection.query(sql)
        res.status(200).json({
            payload: rows,
            message: rows.length  === 0 ? "No se encontraron productos" : "Productos encontrados"
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:"error interno al obtener productos"})
    }
});


app.get("/products/:id", async (req,res)=>{
    try {
        let {id} = req.params;
        let sql = "SELECT * FROM productos where id=?"
        const [rows] = await connection.query(sql,[id]);
        res.status(200).json({payload: rows})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"error interno al obtener un producto con id"})
    }
})




app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el purto ${PORT}`);
    
})