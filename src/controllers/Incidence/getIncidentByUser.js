const {Incidence} = require('../../db');

const getIncidencesByUserHandler = async (req, res) => {
    try {
        const userId = req.userId;
        const incidences = await Incidence.findAll({
            where: {
                UserId: userId
            }
        });
        if (!incidences) {
            return res.status(404).json({ error: 'No se encontraron incidencias para este usuario' });
        }
        res.status(200).json( incidences);
    } catch (error) {
        console.error('Error al obtener las incidencias:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = getIncidencesByUserHandler;