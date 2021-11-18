'use strict';

let mongoose = require('mongoose');
let app = require('./app');
let port = 3700;

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost:27017/portafolio')
	.then(() => {
		console.log('Conexión a la base de datos establecida correctamente');
		app.listen(port, () => {
			console.log(`Servidor escuchando en http://localhost:${port}`);
		});
	})
	.catch((err) => console.log(err));
