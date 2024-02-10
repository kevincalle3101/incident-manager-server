const {Router} = require('express');
const incidense = Router();
const createIncidenceHandler = require('../controllers/Incidence/createIncidence');
const getIncidencesHandler = require('../controllers/Incidence/getAllIncidences');
const updateIncidenceHandler = require('../controllers/Incidence/updateIncidence');
const deleteIncidenceHandler = require('../controllers/Incidence/deleteIncidence');
const createCommentHandler = require('../controllers/Incidence/createComment');
const filterIncidencesHandler = require('../controllers/Incidence/filterIncidence');
const getIncidencesByUserHandler = require('../controllers/Incidence/getIncidentByUser')
const getIncidenceByIdHandler = require('../controllers/Incidence/getIncidenceById');
const { verifyToken, isResident, isAdmin } = require("../middlewares/authJwt");
const upload = require("../utils/multer");

// Rutas para las incidencias
incidense.post('/',[verifyToken, isResident, upload.single("image")], createIncidenceHandler);
incidense.get('/',[verifyToken,isAdmin], getIncidencesHandler);
incidense.get('/byUser',[verifyToken,isResident], getIncidencesByUserHandler);
incidense.get('/:id',verifyToken, getIncidenceByIdHandler);
incidense.put('/:id',[verifyToken,isAdmin], updateIncidenceHandler);
incidense.delete('/:id',[verifyToken,isAdmin], deleteIncidenceHandler);

// Ruta para los comentarios de una incidencia
incidense.post('/:id/comments',verifyToken, createCommentHandler);

// Ruta para filtrar incidencias
incidense.get('/filters/:filter',verifyToken, filterIncidencesHandler);

module.exports = incidense;