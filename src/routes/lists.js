const express = require('express');
const ListController = require('../controllers/ListController');
const { isLoggedIn } = require('../lib/auth');
const routerList = express.Router();

//routerList.get('/producto/:id/:idCategori', ListController.index2);
routerList.get('/producto/:id', ListController.index2);

routerList.post('/agregarComentario/:id',isLoggedIn, ListController.agregarComentario); // ver

routerList.post('/agregarValoracion/:id',isLoggedIn, ListController.agregarValoracion);

routerList.get('/perfil/:id', isLoggedIn,ListController.profileUser); // darle cariño



module.exports = routerList;