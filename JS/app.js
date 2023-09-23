

// Obtengo los elementos del html
let shopContent = document.getElementById("shopContent");
let verCarrito = document.getElementById("verCarrito");
let modalContainer = document.getElementById("modalContainer");
let cantidadCarrito = document.getElementById("cantidadCarrito");

// Función para cargar datos desde un archivo JSON local
async function cargarDatosDesdeJSON() {
    try {
        const response = await fetch('../JSON/productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar los datos JSON.');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error en la solicitud " + error);
        return [];
    }
}

// Llamar a la función para cargar los datos
cargarDatosDesdeJSON()
    .then((productos) => {
        // Muestro productos en la tienda que permite agregarlos al carrito
        productos.forEach((product) => {
            // Creo una tarjeta para cada producto
            let contenido = document.createElement("div");
            contenido.className = "card";
            contenido.innerHTML = `<img src="${product.img}"><div><h5>${product.nombre}</h5><p>$${product.precio}</p></div>`;
            shopContent.appendChild(contenido);

            // Agrego un botón "COMPRAR" para agregar productos al carrito
            let comprar = document.createElement("button");
            comprar.className = "button";
            comprar.innerText = "COMPRAR";
            contenido.appendChild(comprar);

            // Evento para agregar productos al carrito
            comprar.addEventListener("click", () => {

                Toastify({
                    text: "Añadido con éxito",
                    duration: 2500,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to left, #07110e, #8abe53)",
                    },
                }).showToast();

                const repetido = carrito.some((productoRepetido) => productoRepetido.id === product.id);
                if (repetido) {
                    carrito.map((prod) => {
                        if (prod.id === product.id) {
                            prod.cantidad++;
                        }
                    });
                } else {
                    // Agrego los productos seleccionados al carrito 
                    carrito.push({
                        id: product.id,
                        img: product.img,
                        nombre: product.nombre,
                        precio: product.precio,
                        cantidad: 1,
                    });
                }
                carritoContador();
                guardarCarrito();
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });



// Carrito para almacenar los productos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Función para mostrar el carrito en un modal
const abrirCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";

    // Header del modal
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1>Carrito</h1>`;
    modalContainer.appendChild(modalHeader);

    // Body del modal 
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalContainer.appendChild(modalBody);

    // Botón cerrar del modal
    const modalButton = document.createElement("h1");
    modalButton.className = "close";
    modalButton.innerText = "X";
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    modalHeader.appendChild(modalButton);

    // Muestro los productos en el carrito
    carrito.forEach((product) => {
        let carritoContenido = document.createElement("div");
        carritoContenido.className = "carritoContenido";
        carritoContenido.innerHTML =
            `<img src="${product.img}">
                <h5>${product.nombre}</h5>
                <p>$${product.precio}</p>
                <span class="restar">➖</span>
                <p>cantidad: ${product.cantidad}</p>
                <span class="sumar">➕</span>
                <span class="boton-delete">❌</span>
                `;

        modalBody.appendChild(carritoContenido);

        // Eventos para restar y sumar productos
        let restar = carritoContenido.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
                abrirCarrito();
                guardarCarrito();
            }
        });

        let sumar = carritoContenido.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++
            abrirCarrito();
            guardarCarrito();
        });

        // Botón para eliminar productos
        let botonDelete = carritoContenido.querySelector(".boton-delete");
        botonDelete.addEventListener("click", () => {
            eliminarProducto(product.id);
        })
    });

    // Muestro el total a pagar
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    const mostrarTotal = document.createElement("div");
    mostrarTotal.className = "footer-carrito";
    mostrarTotal.innerHTML = `
        <p>Total a pagar: $${total}</p>
        <a href="./formulario.html"><button class="btn-pagar">Pagar ahora</button></a>
        `;
    modalContainer.appendChild(mostrarTotal);
};

// Evento para abrir el carrito
verCarrito.addEventListener("click", abrirCarrito);

// Función para eliminar un producto del carrito
const eliminarProducto = (id) => {
    const productoID = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoID) => {
        return carritoID !== productoID;
    });
    carritoContador();
    guardarCarrito();
    abrirCarrito();
};

// Mensaje si hay productos en el carrito
if (carrito.length > 0) {
    Swal.fire('Tienes productos en el carrito')
}

// Actualizo el contador de productos en el carrito
const carritoContador = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
    const carritoLocal = carrito.length;
    localStorage.setItem("cantidadProductos", JSON.stringify(carritoLocal));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("cantidadProductos"));
}
carritoContador();

// Guardo el carrito en el almacenamiento local
const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
JSON.parse(localStorage.getItem("carrito"));