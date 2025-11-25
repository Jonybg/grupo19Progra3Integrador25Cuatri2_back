let altaProducts_container = document.getElementById("altaProducts-container");
let url = "http://localhost:3000";

altaProducts_container.addEventListener("submit", async (event) => {

    event.preventDefault(); 

    console.log(event.target);

    let formData = new FormData(event.target);

    console.log(formData); 

    let data = Object.fromEntries(formData.entries()); 
    console.log(data)

    try {
        let response = await fetch(`${url}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result);
            alert(result.message)
        }



    } catch(error) { 
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
    
});