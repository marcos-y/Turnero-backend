const Cajero = require('../models/cajerosModel');
//const jwt = require('jsonwebtoken');
//const JWT_SECRET = "tu_clave_secreta_super_segura";

exports.login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        // buscar usuario activo
        const cajero = await Cajero.getByUsuario(usuario);

        if (!cajero) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        // comparación directa (SIN bcrypt)
        if (cajero.password !== password) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        // generar token
        //const token = jwt.sign(
        //    {
        //        id: cajero.id,
        //        usuario: cajero.usuario,
        //        nombre: cajero.nombre
        //    },
        //    JWT_SECRET,
        //    { expiresIn: "8h" }
        //);

        console.log(cajero.id,cajero.nombre,cajero.usuario);

        res.json({
            //token,
            cajero: cajero
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en login" });
    }
};