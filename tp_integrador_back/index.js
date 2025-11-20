import express from "express"; 
const app = express(); 
import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;
const session_key = environments.session_key;
import cors from "cors"; 
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";

app.use(cors()); 
app.use(express.json()); 

app.use(loggerUrl);

app.use(express.static(join(__dirname, "src/public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(session({
    secret: session_key, 
    resave: false, 
    saveUninitialized: true 
}));

app.use("/api/products", productRoutes);
app.use("/", viewRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

