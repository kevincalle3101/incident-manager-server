const {Incidence} = require('../../db');
const {deleteImg} = require('../../utils/cloudinary');

const deleteIncidenceHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const incidentToDelete = await Incidence.findByPk(id);
        if (!incidentToDelete) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }
        const imageDeleteResult = await deleteImg(incidentToDelete.image_public_id);
        if(imageDeleteResult.error){
            return res.status(500).json({ error: 'Error al eliminar la imagen de Cloudinary' });
        }
        await incidentToDelete.destroy();
        return res.status(200).json({ message: 'Incidencia eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la incidencia:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = deleteIncidenceHandler