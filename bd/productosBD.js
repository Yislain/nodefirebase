var conexion = require("./conexion").conexionProductos;
var Producto = require("../models/Producto");

async function mostrarProductos() {
    var products = [];
    try {
        var productos = await conexion.get();
        productos.forEach((producto) => {
            var producto1 = new Producto(producto.id, producto.data());
            if (producto1.bandera === 0) {
                products.push(producto1.obtenerProducto);
            }
        });
    } catch (err) {
        console.log("Error al mostrar productos: " + err);
        products = [];
    }
    return products;
}

async function nuevoProducto(newProduct) {
    var error = 1;
    try {
        var producto1 = new Producto(null, newProduct);
        if (producto1.bandera === 0) {
            await conexion.add(producto1.obtenerProducto);
            error = 0;
        } else {
            console.log("Datos incorrectos del formulario");
        }
    } catch (err) {
        console.log("Error al insertar un nuevo producto: " + err);
    }
    return error;
}

async function buscarPorId(id) {
    var product;
    try {
        var productoBD = await conexion.doc(id).get();
        if (productoBD.exists) {
            var productoObjeto = new Producto(productoBD.id, productoBD.data());
            if (productoObjeto.bandera === 0) {
                product = productoObjeto.obtenerProducto;
            }
        }
    } catch (err) {
        console.log("Error al recuperar el producto: " + err);
    }
    return product;
}

async function modificarProducto(datos) {
    var error = 1;
    var product = await buscarPorId(datos.id);
    if (product) {
        var producto = new Producto(datos.id, datos);
        if (producto.bandera === 0) {
            try {
                await conexion.doc(producto.id).set(producto.obtenerProducto);
                console.log("Los datos se modificaron correctamente");
                error = 0;
            } catch (err) {
                console.log("Error al modificar el producto: " + err);
            }
        }
    }
    return error;
}

async function borrarProducto(id) {
    var error = 1;
    var product = await buscarPorId(id);
    if (product) {
        try {
            await conexion.doc(id).delete();
            console.log("Registro borrado");
            error = 0;
        } catch (err) {
            console.log("Error al borrar el producto: " + err);
        }
    }
    return error;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    buscarPorId,
    modificarProducto,
    borrarProducto,
};
