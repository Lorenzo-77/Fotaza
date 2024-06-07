const express = require('express');
const CategoriController = require('../controllers/CategoriaController');
const routerCategorias = express.Router();


/* Buscar por Titulo*/
routerCategorias.get('/SearchFor', CategoriController.buscarTitulo);
/* BUSCADOR POR CATEGORIAS */
routerCategorias.get('/naturaleza', CategoriController.nombreCategori1);
routerCategorias.get('/arteycultura', CategoriController.nombreCategori2);
routerCategorias.get('/viajesyaventuras', CategoriController.nombreCategori3);
routerCategorias.get('/rodilleras', CategoriController.nombreCategori4);
routerCategorias.get('/genteyretratos', CategoriController.nombreCategori5);
routerCategorias.get('/tecnologiayciencia', CategoriController.nombreCategori6);


/* BUSCADOR POR Tags */
routerCategorias.get('/:tag', CategoriController.nombreTag);






module.exports = routerCategorias;