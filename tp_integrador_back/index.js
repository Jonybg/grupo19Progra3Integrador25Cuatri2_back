import express from "express"; 
const app = express(); 
import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRouter } from "./src/api/routes/index.js";
import { __dirname,join } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";

app.use(cors());
app.use(express.json()); 
app.use(loggerUrl);
app.use(express.static(join(__dirname,"src/public")));
app.use("/api/products",productRouter);


app.set("view engine", "ejs");
app.set("views", join(__dirname,"src/views"));


app.get("/dashboard", async (req,res)=>{
    try {
        const [rows] = await connection.query("SELECT * FROM productos")        
        res.render("index",{
        title: "Dashboard",
        about: "Listado de productos",
        productos: rows
    })
    } catch (error) {
        console.error(error);        
    }
    
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

