const express = require('express');

const autenticar = require('../middlewares/autenticar');

const router = express.Router();

const tipoProdutoController = require('../controllers/tipoProdutoController');

router.post('/tipo-produto', autenticar, tipoProdutoController.inserirTipoProduto);
router.get('/tipo-produto', autenticar, tipoProdutoController.listarTiposProduto);

module.exports = router;