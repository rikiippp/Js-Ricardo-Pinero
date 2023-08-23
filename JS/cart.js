// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Array de productos 
let productos = [
    new Producto("Armario", 55000),
    new Producto("Lamparas", 4300),
    new Producto("Silla", 11000),
    new Producto("Escritorio", 34000),
];

// Función flecha para mostrar productos
let mostrarProductos = (productos) => {
    let resultado = {};
    for (let producto of productos) {
        resultado[producto.nombre] = producto.precio;
    }
    return resultado;
};

// Creo la función de orden superior
let aplicarFuncion = (funcion, productos) => {
    return funcion(productos);
};

// Muestro los productos disponibles en la tienda
alert("Estos son los productos disponibles:\n - Armario $55.000\n - Lamparas $4.300\n - Silla $11.000\n - Escritorio $34.000");

// Clase Carrito
class Carrito {
    constructor(productos) {
        this.productos = productos;
        this.total = 0;
    }

    // Agrego el producto al carrito y actualizo el total
    agregarProducto(producto) {
        producto.fechaAgregado = new Date(); // Agrego la propiedad fecha
        this.productos.push(producto);
        this.total += producto.precio;
        alert(`Se ha agregado ${producto.nombre} al carrito por ${producto.precio} pesos.\n Fecha: ${producto.fechaAgregado}`);
        alert(`El total a pagar es ${this.total} pesos.`);
    }

    // Quito el producto seleccionado y actualizo el carrito
    quitarProducto(producto) {
        let indice = this.productos.indexOf(producto);
        if (indice !== -1) {
            this.productos.splice(indice, 1);
            this.total -= producto.precio;
            alert(`Se ha quitado ${producto.nombre} del carrito por ${producto.precio} pesos.`);
            alert(`El total a pagar es ${this.total} pesos.`);
        } else {
            alert(`No se ha encontrado ${producto.nombre} en el carrito.`);
        }
    }

    // Muestro el total a pagar
    mostrarTotal() {
        alert(`El total a pagar es ${this.total} pesos.`);
    }

}

// Carrito vacio
let carrito = new Carrito([]);

// Creo una funcion para que el usuario interactue
let interactuarConUsuario = () => {
    let opcion = prompt("¿Qué quieres hacer? (ingrese un numero) \n1. Agregar producto \n2. Quitar producto \n3. Mostrar total \n4. Salir").toLowerCase();
    switch (opcion) {
        case "1":
            let nombreProducto = prompt("¿Qué producto quieres agregar?").toLowerCase();
            let productoEncontrado = productos.find((producto) => producto.nombre.toLowerCase() === nombreProducto);
            if (productoEncontrado) {
                carrito.agregarProducto(productoEncontrado);
            } else {
                alert(`No se ha encontrado el producto ${nombreProducto}.`);
            }
            interactuarConUsuario();
            break;

        case "2":
            let nombreProducto2 = prompt("¿Qué producto quieres quitar?").toLowerCase();
            let productoEncontrado2 = productos.find((producto) => producto.nombre.toLowerCase() === nombreProducto2);
            if (productoEncontrado2) {
                carrito.quitarProducto(productoEncontrado2);
            } else {
                alert(`No se ha encontrado el producto ${nombreProducto2}.`);
            }
            interactuarConUsuario();
            break;

        case "3":
            carrito.mostrarTotal();
            interactuarConUsuario();
            break;

        case "4":
            console.log("El sistema carrito se ha cerrado.");
            alert("Gracias por haber usado mi carrito <3");
            break;

        default:
            alert("Opción inválida.");
            interactuarConUsuario();
            break;
    }
}

interactuarConUsuario();
