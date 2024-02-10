const {Incidence} = require('../../db');

const updateIncidenceHandler = async (req, res) => {
    const { id } = req.params;
    const { isResolved } = req.body;
    try {
        const updatedIncidence = await Incidence.findByPk(id);
        if (!updatedIncidence) {
            return res.status(404).json({ error: 'Incidencia no encontrada' })
        }
        updatedIncidence.isResolved = isResolved;
        await updatedIncidence.save();
        res.status(200).json({ message: 'Estado de la incidencia actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la incidencia:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = updateIncidenceHandler;
