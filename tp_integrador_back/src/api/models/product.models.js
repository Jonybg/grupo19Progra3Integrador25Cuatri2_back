import connection from "../database/db.js";


const selectAllProducts = ()=>{
    const sql = `SELECT * FROM productos`;
    return  connection.query(sql);
}


const selectProductWhereID = (id)=>{
    let sql = `SELECT * FROM productos where id = ?`;
    return connection.query(sql, [id]);
}


const inserProduct = (nombre,imagen,categoria,precio) =>{
    let sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [nombre, imagen, categoria, precio]);
}

const updateProduct = (nombre,imagen,categoria,precio,id) =>{
    let sql = `
            UPDATE productos
            SET nombre = ?, imagen = ?, categoria = ?, precio = ?
            WHERE id = ?
        `;

        return connection.query(sql, [nombre, imagen, categoria, precio, id]);
}

const deleteProduct = (id) =>{
      let sql = "DELETE FROM productos WHERE id = ?";
      return connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductWhereID,
    inserProduct,
    updateProduct,
    deleteProduct
}