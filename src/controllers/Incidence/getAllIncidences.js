const {Incidence, User} = require('../../db');

const getIncidencesHandler = async (req, res) => {
    try {
        const incidences = await Incidence.findAll(
            {
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        );
        if (!incidences) {
            return res.status(404).json({ error: 'Incidencias no encontradas' })
        }
        res.status(200).json( incidences );
    } catch (error) {
        console.error('Error al obtener las incidencias:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = getIncidencesHandler