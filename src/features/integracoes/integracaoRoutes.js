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

router.post('/integracoes', autenticar, integracaoController.cadastrarIntegracao);
router.get('/integracoes', autenticar, integracaoController.listarIntegracoes); 
router.put('/integracoes', autenticar, integracaoController.editarIntegracao);
router.delete('/integracoes/:id', autenticar, integracaoController.inativarIntegracao);
router.get('/integracoes/mercado-livre/auth', autenticar, integracaoController.authMercadoLivre);

module.exports = router;