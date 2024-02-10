const {Incidence} = require('../../db');
const { uploadImgProduct } = require('../../utils/cloudinary');
const  {sendNewIncidence}  = require('../../utils/nodemailer');

const createIncidenceHandler = async (req, res) => {
    const { subject, type, description, location } = req.body;
    const userId = req.userId;
    const filePath = req.file?.path;
    try {
        if (!filePath) {
            throw new Error('No se ha proporcionado ninguna imagen');
        }
        const result = await uploadImgProduct(filePath);
        if (!result || !result.public_id || !result.secure_url) {
            throw new Error('La carga de la imagen no devolvió los datos esperados');
        }
        let newIncidence = await Incidence.create({
            UserId: userId,
            subject,
            type,
            description,
            image_public_id: result.public_id,
            image_secure_url: result.secure_url,
            location,
            isResolved: false,
            Created_At: new Date(),
        });
        if (!newIncidence) {
            return res.status(404).json({ error: 'Error al crear incidencia' })
        }
        await sendNewIncidence(userId);
        res.status(201).json({ message: 'Incidencia creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la incidencia:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    };
};

module.exports = createIncidenceHandler