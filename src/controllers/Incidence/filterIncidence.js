const { Incidence } = require('../../db');

const filterIncidencesHandler = async (req, res) => {
    const { filter } = req.params;
    const userId = req.userId;
    const isAdmin = req.isAdmin;
    try {
        if(filter !== 'newest' && filter !== 'oldest' && filter !== 'active' && filter !== 'pending' && filter !== 'clear'){
            return res.status(400).json({ error: 'Filtro no válido' });
        }
        let filterOptions = {};
        if (!req.isAdmin) {
            filterOptions.UserId = userId;
        }
        if(filter === 'active'){
            filterOptions.isResolved = true
        } else if (filter === 'pending') {
            filterOptions.isResolved = false
        }
        let orderDirection = 'DESC';
        if (filter === 'oldest') {
            orderDirection = 'ASC'; 
        }
        const filteredIncidences = await Incidence.findAll({
            where: filterOptions,
            order: [['createdAt', orderDirection]],
        });

        if(!filteredIncidences.length){
            return res.status(404).json({ error: 'No se encontraron incidencias' });
        }

        res.status(200).json({ incidences: filteredIncidences });
    } catch (error) {
        console.error('Error al filtrar las incidencias:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = filterIncidencesHandler;