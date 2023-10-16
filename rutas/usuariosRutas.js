const express = require("express");
const ruta = express.Router();
const multer = require("multer");
const fs = require("fs");
const { mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario } = require("../bd/usuariosBD");

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

ruta.get("/", async (req, res) => {
  try {
    const users = await mostrarUsuarios();
    res.render("usuarios/mostrar", { users });
  } catch (error) {
    console.error("Error al mostrar usuarios: " + error);
    res.status(500).send("Error al mostrar usuarios");
  }
});

ruta.get("/nuevoUsuario", (req, res) => {
  res.render("usuarios/nuevo");
});

ruta.post("/nuevoUsuario", subirArchivo.single('foto'), async (req, res) => {
  if (req.file) {
    req.body.foto = req.file.originalname;
  }

  try {
    await nuevoUsuario(req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error al crear nuevo usuario: " + error);
    res.status(500).send("Error al crear nuevo usuario");
  }
});

ruta.get("/editarUsuario/:id", async (req, res) => {
  try {
    const user = await buscarPorId(req.params.id);
    if (user) {
      res.render("usuarios/modificar", { user });
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al buscar usuario por ID: " + error);
    res.status(500).send("Error al buscar usuario por ID");
  }
});

ruta.post("/editarUsuario", subirArchivo.single('foto'), async (req, res) => {
  try {
    const user = await buscarPorId(req.body.id);
    if (user) {
      if (req.file) {
        // Elimina el archivo de la foto anterior si existe
        if (user.foto) {
          fs.unlinkSync(`uploads/${user.foto}`);
        }
        req.body.foto = req.file.originalname;
      }
      await modificarUsuario(req.body);
      res.redirect("/");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al editar usuario: " + error);
    res.status(500).send("Error al editar usuario");
  }
});

ruta.get("/borrarUsuario/:id", async (req, res) => {
  try {
    const user = await buscarPorId(req.params.id);
    if (user) {
      // Elimina el archivo de la foto si existe
      if (user.foto) {
        fs.unlinkSync(`uploads/${user.foto}`);
      }
      await borrarUsuario(req.params.id);
      res.redirect("/");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al borrar usuario: " + error);
    res.status(500).send("Error al borrar usuario");
  }
});

module.exports = ruta;
