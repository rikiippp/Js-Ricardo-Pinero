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
        console.log(error);
        return [];
    }
}

// Función para crear una tarjeta de producto
function crearTarjetaProducto(product) {
    const { img, nombre, precio } = product;

    const contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `<img src="${img}"><div><h5>${nombre}</h5><p>$${precio}</p></div>`;

    const comprar = document.createElement("button");
    comprar.className = "button";
    comprar.innerText = "COMPRAR";
    comprar.addEventListener("click", () => agregarAlCarrito(product));
    
    contenido.appendChild(comprar);

    return contenido;
}

// Agregar productos al carrito
function agregarAlCarrito(product) {
    const repetido = carrito.find((productoRepetido) => productoRepetido.id === product.id);

    if (repetido) {
        repetido.cantidad++;
    } else {
        carrito.push({ ...product, cantidad: 1 });
    }

    carritoContador();
    guardarCarrito();

    mostrarNotificacion("Añadido con éxito");
}

// Función para mostrar una notificación
function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
        duration: 2500,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
            background: "linear-gradient(to left, #07110e, #8abe53)",
        },
    }).showToast();
}

// Cargar datos y mostrar productos
async function cargarProductos() {
    try {
        const productos = await cargarDatosDesdeJSON();
        
        productos.forEach((product) => {
            const tarjetaProducto = crearTarjetaProducto(product);
            shopContent.appendChild(tarjetaProducto);
        });
    } catch (error) {
        console.error(error);
    }
}

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
            Toastify({
                text: "Producto eliminado",
                duration: 2500,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to left, #CF5353, #CF3030)",
                },
            }).showToast();
        });
    });

    // Muestro el total a pagar
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    const mostrarTotal = document.createElement("div");
    mostrarTotal.className = "footer-carrito";
    mostrarTotal.innerHTML = `
        <p>Total a pagar: $${total}</p>
        <a href="./compra.html" class="pagar-ahora"><button class="btn-pagar">Ir a comprar</button></a>
        `;
    modalContainer.appendChild(mostrarTotal);

    // Evento para mostrar el mensaje si no hay productos en el carrito al hacer clic en "Ir a comprar"
    let irAComprarButton = document.querySelector(".pagar-ahora button.btn-pagar");
    irAComprarButton.addEventListener("click", (event) => {
        if (carrito.length == 0) {
            event.preventDefault(); // Evito que se redireccione
            Swal.fire({
                icon: 'error',
                title: 'No tienes productos en el carrito',
                showConfirmButton: false,
                timer: 1500,
                position: 'top',
            });
        }
    });
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
// Verifica si la página permite mostrar el mensaje
const mostrarMensaje = document.querySelector('meta[name="mostrar-mensaje"]').getAttribute("content");
(mostrarMensaje === "si" && carrito.length > 0) ?
    Swal.fire({
        title: 'Tienes productos en tu carrito',
        position: 'top',
        confirmButtonColor: '#398378',
    }) : null;

// Actualizo el contador de productos en el carrito
const carritoContador = () => {
    cantidadCarrito.style.display = carrito.length > 0 ? "block" : "none";
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

// Llamar a la función para cargar los productos
cargarProductos();

// Evento para abrir el carrito
verCarrito.addEventListener("click", abrirCarrito);