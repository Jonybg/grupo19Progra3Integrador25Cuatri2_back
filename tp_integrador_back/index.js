import express from "express"; 
const app = express(); 
import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;
import cors from "cors"; 
import { loggerUrl, validateId } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

app.use(cors()); 
app.use(express.json()); 

app.use(loggerUrl);

app.use("/api/products", productRoutes);




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

