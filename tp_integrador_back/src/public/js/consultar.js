let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";

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
    
    if(response.ok){
        let producto = datos.payload[0];
        console.log(producto);
        mostrarProducto(producto);
    } else{
        console.log(datos);
        console.log(datos.message);
        mostrarError(datos.message);
    }
    });

    function mostrarProducto(producto){
    let htmlProducto = `
        <li class="li-producto">
            <img class="producto-img" src="${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: ${producto.precio}</strong></p>
        </li>
    `;
    listaProductos.innerHTML = htmlProducto;
}

function mostrarError(message){
    listaProductos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}
    
