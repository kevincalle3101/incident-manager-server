const {User} = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'email o contraseña incorrectos' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'email o contraseña incorrectos' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Ha habido un error en el servidor' });
    }
};

module.exports = loginHandler