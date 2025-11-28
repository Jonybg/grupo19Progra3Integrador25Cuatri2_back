import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router()


router.get("/",productsView);
router.get("/consultar",requireLogin,(req,res)=>{
    res.render("consultar",{
        title:"Consultar",
        about: "Consultar producto por id"
    });
});

router.get("/crear",requireLogin, (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    })
});

router.get("/modificar",requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.get("/eliminar",requireLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    })
});


router.get("/login",(req,res)=>{
    res.render("login",{
        title: "Login"
    })
})

export default router;