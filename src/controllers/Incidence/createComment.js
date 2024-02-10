const {Incidence} = require('../../db');
const {Comment} = require('../../db');

const createCommentHandler = async (req, res) => {
    try {
        const { content } = req.body;
        const incidenceId = req.params.id;
        const userId = req.userId;
        const incident = await Incidence.findByPk(incidenceId);
        if (!incident) {
            return res.status(404).json({ error: 'Error al encontrar la incidencia a comentar' });
        }
        const comment = await Comment.create({
            content: content,
            IncidenceId: incident.id,
            UserId: userId,
            Created_At: new Date(),
        })
        if (!comment) {
            return res.status(404).json({ error: 'Error al crear el comentario' });
        }
        res.status(201).json({ 'Comentario creado exitosamente': comment });
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = createCommentHandler