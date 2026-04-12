const express = require('express');

const autenticar = require('../../middlewares/autenticar');

const router = express.Router();

const integracaoController = require('./integracaoController');


/**
 * @swagger
 * tags:
 *   name: Integrações
 *   description: API para gerenciamento de integrações
 */

router.get('/integracoes/callback', integracaoController.mercadoLivreCallback);

module.exports = router;