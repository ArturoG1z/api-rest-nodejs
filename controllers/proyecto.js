'use strict';
const Proyecto = require('../models/proyecto');
const fs = require('fs');
const isWin = process.platform === 'win32';
const path = require('path');
let controller = {
	home(req, res) {
		console.log(req.body.nombre);
		res.status(200).send({
			message: 'bienvenidos API NodeJS',
		});
	},
	test(req, res) {
		res.status(200).send({
			message: 'Metodo test de proyecto',
		});
	},
	save(req, res) {
		let params = req.body;
		let proyecto = new Proyecto();
		proyecto.nombre = params.nombre;
		proyecto.semestre = params.semestre;
		proyecto.materia = params.materia;
		proyecto.anio = params.anio;
		proyecto.imagen = null;

		proyecto.save((err, proyectoStored) => {
			if (err) return res.status(500).send({ message: 'Error al guardar el proyecto' });
			if (!proyectoStored) return res.status(404).send({ message: 'No se ha guardado el proyecto' });
			return res.status(200).send({ proyecto: proyectoStored });
		});
	},
	get(req, res) {
		let proyectoId = req.params.id;

		if (proyectoId == null) return res.status(404).send({ message: 'El proyecto no existe.' });

		Proyecto.findById(proyectoId, (err, proyecto) => {
			if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

			if (!proyecto) return res.status(404).send({ message: 'El proyecto no existe.' });

			return res.status(200).send({
				proyecto,
			});
		});
	},

	getAll(req, res) {
		Proyecto.find({})
			.sort('-year')
			.exec((err, proyectos) => {
				if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

				if (!proyectos) return res.status(404).send({ message: 'No hay proyectoos que mostrar.' });

				return res.status(200).send({ proyectos });
			});
	},

	update(req, res) {
		let proyectoId = req.params.id;
		let update = req.body;

		Proyecto.findByIdAndUpdate(proyectoId, update, { new: true }, (err, proyectoUpdated) => {
			if (err) return res.status(500).send({ message: 'Error al actualizar' });

			if (!proyectoUpdated) return res.status(404).send({ message: 'No existe el proyecto para actualizar' });

			return res.status(200).send({
				proyecto: proyectoUpdated,
			});
		});
	},

	delete(req, res) {
		let proyectoId = req.params.id;

		Proyecto.findByIdAndRemove(proyectoId, (err, proyectoRemoved) => {
			if (err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' });

			if (!proyectoRemoved) return res.status(404).send({ message: 'No se puede eliminar ese proyecto.' });

			return res.status(200).send({
				proyecto: proyectoRemoved,
			});
		});
	},
	uploadImage(req, res) {
		let proyectoId = req.params.id;
		let fileName = 'Imagen no subida';
		if (req.files) {
			let filePath = req.files.imagen.path;
			let fileSplit = isWin ? filePath.split('\\') : filePath.split('/');
			let fileName = fileSplit[1];
			let extSplit = fileName.split('.');
			let fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
				Proyecto.findByIdAndUpdate(proyectoId, { imagen: fileName }, { new: true }, (err, proyectoUpdated) => {
					if (err) return res.status(500).send({ message: 'Error al actualizar' });

					if (!proyectoUpdated) return res.status(404).send({ message: 'No existe el proyecto para actualizar' });

					return res.status(200).send({
						proyecto: proyectoUpdated,
					});
				});
			} else {
				fs.unlink(filePath, (err) => {
					return res.status(200).send({ message: 'La extension no es valida' });
				});
			}
		} else {
			return res.status(200).send({ message: fileName });
		}
	},
	getImageFile: function (req, res) {
		var file = req.params.image;
		var path_file = './uploads/' + file;

		fs.exists(path_file, (exists) => {
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			} else {
				return res.status(200).send({
					message: 'No existe la imagen...',
				});
			}
		});
	},
};

module.exports = controller;
