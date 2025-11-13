import ProductModels from "../models/product.models.js"

export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();
        
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
}

export const getProductById = async (req, res) => {
    try {

        let { id } = req.params; 
    
        const [rows] = await ProductModels.selectProductWhereId(id);

        if(rows.length === 0){
            console.log("Error, no existe un producto con es id.");

            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { nombre, imagen, categoria, precio } = req.body;
        console.log(req.body); 

        if(!nombre || !imagen || !categoria || !precio){
            
            return res.status(400).json({
                message: "Datos invalidos. Asegurese de enviar todos los campos del formulario"
            });
        }

        let [rows] = await ProductModels.insertProduct(nombre, imagen, categoria, precio);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

export const modifyProduct = async (req, res) => {
    try {

        let { id, nombre, imagen, categoria, precio, activo } = req.body;

        if(!id || !nombre || !categoria || !precio || !activo){
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let [result] = await ProductModels.updateProduct(nombre, imagen, categoria, precio, id);
        console.log(result);

        if(result.affectedRows === 0){
            return res.status(400).json({
                message: "No se actualizo el producto"
            })
        }

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
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;

        

        let [result] = await ProductModels.deleteProduct(id)
        console.log(result);

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `No se encontro el producto con el id ${id}`
            })
        }

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
}