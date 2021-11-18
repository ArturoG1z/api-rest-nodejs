'use strict'
let express = require('express')
let ProyectoController = require('../controllers/proyecto');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProyectoController.home);
router.get('/test', ProyectoController.test);
router.get('/proyectos', ProyectoController.getAll);
router.get('/proyecto/:id?', ProyectoController.get);
router.post('/proyecto/save', ProyectoController.save);
router.patch('/proyecto/:id', ProyectoController.update);
router.delete('/proyecto/:id', ProyectoController.delete);
router.patch('/upload-image/:id', multipartMiddleware, ProyectoController.uploadImage);

module.exports = router;