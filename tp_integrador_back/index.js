import express from "express"; 
const app = express(); 
import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;
const session_key = environments.session_key;
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRouter, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname,join } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";
import session from "express-session"
import bcrypt from "bcrypt"
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}))
app.use(loggerUrl);
app.use(express.static(join(__dirname,"src/public")));



app.set("view engine", "ejs");
app.set("views", join(__dirname,"src/views"));





app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));





app.use("/api/products",productRouter);
app.use("/",viewRoutes)
app.use("/api/users",userRoutes)


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;  

        if(!email || !password) {
            return res.render("login", {
                title: "login",
                error: "Todos los campos son necesarios!"
            });
        }

        const sql = "SELECT * FROM usuarios where email = ?";
        const [rows] = await connection.query(sql, [email]);

        if(rows.length === 0) {
            return res.render("login", {
                title: "Login",
                error: "Error! Email o password no validos"
            });
        }

        console.log(rows); 
        const user = rows[0];
        console.table(user);

        const match = await bcrypt.compare(password, user.password); 

        console.log(match);

        if(match) {            
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
    
            res.redirect("/");

        } else {
            return res.render("login", {
                title: "Login",
                error: "Epa! Contraseña incorrecta"
            });
        }


    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

