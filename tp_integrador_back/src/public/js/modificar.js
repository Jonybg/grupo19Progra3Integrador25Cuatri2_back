let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";
let updateFormContainer = document.getElementById("updateFormContainer");


getProductForm.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 

    let formData = new FormData(event.target); 

    console.log(formData); 

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    let idProd = data.idProd; 
    console.log(idProd);

    console.log(`Realizando una peticion GET a la url ${url}/api/products/${idProd}`);
    
    let response = await fetch(`${url}/api/products/${idProd}`);

    let datos = await response.json();
    console.log(datos);

    let producto = datos.payload[0]; 
    console.log(producto);

    let htmlProducto = `
        <li class="li-producto">
                <img class="producto-img" src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: ${producto.precio}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto">
        </li>
    `;

    listaProductos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        
        event.stopPropagation(); 

        crearFormulario(producto);
    })
});


async function crearFormulario(producto) {
    console.table(producto);

    let updateFormHTML = `
        <form id="updateProducts_form">

            <input type="hidden" name="id" id="idProd" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="nombre" id="nameProd" value="${producto.nombre}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="imagen" id="imageProd" value="${producto.imagen}" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>

            <label for="categoryProd">Categoria</label>
            <select name="categoria" id="Auriculares" required>
                <option value="Auriculares">Auriculares</option>
                <option value="Smartphone">Smartphone</option>
            </select>

            <input type="hidden" name="active" id="activeProd" value="${producto.active}">

            <input type="submit" value="Actualizar producto">
        </form>
    `;

    updateFormContainer.innerHTML = updateFormHTML;

    let updateProducts_form = document.getElementById("updateProducts_form");

    updateProducts_form.addEventListener("submit", event => {
        actualizarProducto(event);
    });
}


async function actualizarProducto(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("Preparando datos del formulario para el PUT");

    let formData = new FormData(event.target); 

    let data = Object.fromEntries(formData.entries());
    console.log(data); 

    try {
        let response = await fetch(`${url}/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            console.log(result.message);
            alert(result.message);
        }

    } catch (error) {

    }
    
}