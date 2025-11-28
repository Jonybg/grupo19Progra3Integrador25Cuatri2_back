import bcrypt from "bcrypt"
import UserModels from "../models/user.models.js";

export const insertUser = async (req,res)=>{
    try {
        const{nombre,email,password} = req.body;

        if(!nombre || !email || !password){
            return res.status(400).json({
                message: "Datos invalidos, asegurate de completar y enviar todos los campos del formulario"
            })
        }
        
        const saltrounds = 10
        const hashedPassword = await bcrypt.hash(password,saltrounds)

        const [rows] = await UserModels.insertUser(nombre,email,hashedPassword)

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        })

    } catch (error) {
        console.log("Error interno en el servidor")
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}