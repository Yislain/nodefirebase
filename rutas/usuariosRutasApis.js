const express = require("express");
const ruta = express.Router();
const { mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario } = require("../bd/usuariosBD");

// Ruta para obtener la lista de usuarios en formato JSON
ruta.get("/api/", async (req, res) => {
    try {
        const users = await mostrarUsuarios();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "Usuarios no encontrados" });
        }
    } catch (error) {
        console.error("Error al obtener la lista de usuarios: " + error);
        res.status(500).json({ message: "Error al obtener la lista de usuarios" });
    }
});

// Ruta para crear un nuevo usuario
ruta.post("/api/nuevoUsuario", async (req, res) => {
    try {
        const error = await nuevoUsuario(req.body);
        if (error === 0) {
            res.status(201).json({ message: "Usuario registrado correctamente" });
        } else {
            res.status(400).json({ message: "Error al registrar al usuario" });
        }
    } catch (error) {
        console.error("Error al registrar un nuevo usuario: " + error);
        res.status(500).json({ message: "Error al registrar al usuario" });
    }
});

// Ruta para buscar un usuario por su ID
ruta.get("/api/buscarUsuarioPorId/:id", async (req, res) => {
    try {
        const user = await buscarPorId(req.params.id);
        if (user !== undefined) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar el usuario por ID: " + error);
        res.status(500).json({ message: "Error al buscar el usuario" });
    }
});

// Ruta para editar un usuario
ruta.post("/api/editarUsuario/:id", async (req, res) => {
    try {
        req.body.id = req.params.id; // Asigna el ID del usuario a modificar desde los parámetros de la URL
        const error = await modificarUsuario(req.body);
        if (error === 0) {
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        } else {
            res.status(400).json({ message: "Error al actualizar al usuario" });
        }
    } catch (error) {
        console.error("Error al editar el usuario: " + error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
});

// Ruta para borrar un usuario por su ID
ruta.get("/api/borrarUsuario/:id", async (req, res) => {
    try {
        const error = await borrarUsuario(req.params.id);
        if (error === 0) {
            res.status(200).json({ message: "El usuario fue borrado" });
        } else {
            res.status(400).json({ message: "Error al borrar al usuario" });
        }
    } catch (error) {
        console.error("Error al borrar el usuario: " + error);
        res.status(500).json({ message: "Error al borrar el usuario" });
    }
});

module.exports = ruta;
