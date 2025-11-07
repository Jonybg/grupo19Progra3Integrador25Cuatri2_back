import express from "express"; 
const app = express(); 
import connection from "./src/api/database/db.js"; 
import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;
import cors from "cors";

app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]  ${req.method}  ${req.url}`);
    next(); 
});


app.get("/products", async (req, res) => {
    try {
        
        const sql = `SELECT * FROM productos`;
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});

app.get("/products/:id", async (req, res) => {
    try {

        let { id } = req.params; 
        let sql = `SELECT * FROM productos where id = ?`;
        const [rows] = await connection.query(sql, [id]); 

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        })
    }
});

app.post("/products", async (req, res) => {
    try {
        const { nombre, imagen, categoria, precio } = req.body;
        console.log(req.body); 

        let sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";

        let [rows] = await connection.query(sql, [nombre, imagen, categoria, precio]);

        res.status(201).json({
            message: "Producto creado con exito"
        });

    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});

app.put("/products", async (req, res) => {
    try {

        let { id, nombre, imagen, categoria, precio, activo } = req.body;

        let sql = `
            UPDATE productos
            SET nombre = ?, imagen = ?, categoria = ?, precio = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [nombre, imagen, categoria, precio, id]);
        console.log(result);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
        

    } catch (error) {
        console.error("Error al actualizar el producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        // Opcion 1: Borrado normal
        let sql = "DELETE FROM productos WHERE id = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });
        
    } catch (error) {
        console.log(`Error al eliminar un producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

