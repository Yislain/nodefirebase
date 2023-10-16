const express = require("express");
const ruta = express.Router();
const multer = require("multer");
const fs = require("fs");
const { mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");

// Configura Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define la carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const subirArchivo = multer({ storage });

ruta.get("/mostrarProductos", async (req, res) => {
  try {
    const products = await mostrarProductos();
    res.render("productos/mostrarP", { products });
  } catch (error) {
    console.error("Error al mostrar productos: " + error);
    res.status(500).send("Error al mostrar productos");
  }
});

ruta.get("/nuevoProducto", (req, res) => {
  res.render("productos/nuevoP");
});

ruta.post("/nuevoProducto", subirArchivo.single('foto'), async (req, res) => {
  if (req.file) {
    req.body.foto = req.file.originalname;
  }

  try {
    await nuevoProducto(req.body);
    res.redirect("/mostrarProductos");
  } catch (error) {
    console.error("Error al crear nuevo producto: " + error);
    res.status(500).send("Error al crear nuevo producto");
  }
});

ruta.get("/editarProducto/:id", async (req, res) => {
  try {
    const product = await buscarPorId(req.params.id);
    if (product) {
      res.render("productos/modificarP", { product });
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al buscar producto por ID: " + error);
    res.status(500).send("Error al buscar producto por ID");
  }
});

ruta.post("/editarProducto", subirArchivo.single('foto'), async (req, res) => {
  try {
    const product = await buscarPorId(req.body.id);
    if (product) {
      if (req.file) {
        // Elimina el archivo de la foto anterior si existe
        if (product.foto) {
          fs.unlinkSync(`uploads/${product.foto}`);
        }
        req.body.foto = req.file.originalname;
      }
      await modificarProducto(req.body);
      res.redirect("/mostrarProductos");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al editar producto: " + error);
    res.status(500).send("Error al editar producto");
  }
});

ruta.get("/borrarProducto/:id", async (req, res) => {
  try {
    const product = await buscarPorId(req.params.id);
    if (product) {
      // Elimina el archivo de la foto si existe
      if (product.foto) {
        fs.unlinkSync(`uploads/${product.foto}`);
      }
      await borrarProducto(req.params.id);
      res.redirect("/mostrarProductos");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al borrar producto: " + error);
    res.status(500).send("Error al borrar producto");
  }
});

module.exports = ruta;
