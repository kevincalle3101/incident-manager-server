const { User } = require('../../db');
const bcrypt = require('bcrypt');

const signUpHandler = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Este correo electrónico ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });
        res.status(201).json({ message: '¡Te haz registrado correctamente! Por favor, inicia sesión para comenzar.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ 'Ha habido un error en el servidor': error });
    }
};

module.exports = signUpHandler;