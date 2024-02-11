const { Incidence, Comment, User } = require('../../db');

const getIncidenceByIdHandler = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(403).json({ error: 'Usuario no encontrado' });
        }
        const incidence = await Incidence.findByPk(id, {
            include: [{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }]
        });
        if (!incidence) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }
        if (!user.isAdmin && incidence.UserId !== userId) {
            return res.status(403).json({ error: 'Este usuario no tiene acceso a esta incidencia' });
        }
        res.status(200).json( incidence );
    } catch(error) {
        console.error('Error al obtener la incidencia:', error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
};

module.exports = getIncidenceByIdHandler;