const {User} = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUpHandler = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Este correo electrónico ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ 'Ha habido un error en el servidor' : error });
    }
};

module.exports = signUpHandler;