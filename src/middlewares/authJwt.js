const jwt = require("jsonwebtoken");
const {User} = require('../db');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;

        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado in verifyToken" });
        }
        req.isAdmin = user.isAdmin;
        next();
    } catch (error) {
        console.error("Error en el middleware verifyToken:", error);
        return res.status(401).json({ message: "Acceso denegado" });
    }
};
const isResident = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (!user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Solo los residentes pueden crear incidentes" });
        }
    } catch (error) {
        console.error("Error en el middleware isNotAdmin:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Se requiere rol de administrador" });
        }
    } catch (error) {
        console.error("Error en el middleware isAdmin:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = { verifyToken,isResident, isAdmin };