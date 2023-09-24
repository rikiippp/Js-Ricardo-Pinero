// Función para calcular y mostrar el total
function actualizarTotal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    const totalCarrito = document.getElementById("totalCarrito");
    
    totalCarrito.textContent = total ? `Total: $${total}` : "Total: $0";
    
}

// Función para cargar y mostrar los productos en la tabla de compra.html
function mostrarProductosEnCarrito() {
    const tablaCarrito = document.getElementById("tablaCarrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Limpia la tabla
    tablaCarrito.innerHTML = "";

    // Itera sobre los productos en el carrito y llena la tabla
    carrito.forEach((producto) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="img-lista"><img src="${producto.img}"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <input type="number" name="cantidad" class="cantidad" min="1" value="${producto.cantidad}">
            </td>
            <td class="subtotal">$${producto.precio * producto.cantidad}</td>
        `;
        tablaCarrito.appendChild(fila);

        // Agregar evento input al input de cantidad para calcular el subtotal
        const cantidadInput = fila.querySelector(".cantidad");
        const subtotalTd = fila.querySelector(".subtotal");

        cantidadInput.addEventListener("input", () => {
            const nuevaCantidad = parseInt(cantidadInput.value, 10);
            producto.cantidad = nuevaCantidad; // Actualizar la cantidad en el objeto del producto
            const nuevoSubtotal = producto.precio * nuevaCantidad;
            subtotalTd.textContent = `$${nuevoSubtotal}`;
            guardarCarrito();
            actualizarTotal();
        });
    });

    // Llamar a una función para actualizar el total inicialmente
    actualizarTotal();
}

// Evento para el botón "Confirmar Compra"
const confirmarCompraButton = document.getElementById("confirmarCompra");
if (confirmarCompraButton) {
    confirmarCompraButton.addEventListener("click", () => {
        const formularioCompra = document.getElementById("formularioCompra");

        if (formularioCompra.checkValidity()) {
            // Formulario completo, realizar la compra
            console.log("Compra realizada");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu compra ha sido realizada',
                showConfirmButton: false,
                timer: 2000
            });

            // Limpiar el carrito y actualizar la tabla
            localStorage.removeItem("carrito");
            mostrarProductosEnCarrito();
            actualizarTotal();

            // Agregar un retraso de 3 segundos antes de volver al índice
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 3000);
        } else {
            // Formulario incompleto, mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Completa el formulario correctamente antes de confirmar la compra',
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
}

// Llamo a la función para mostrar los productos cuando se carga la página
document.addEventListener("DOMContentLoaded", mostrarProductosEnCarrito);
