const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const integracoesRoutes = require('./integracaoRoutes');
const categoriaProdutoRoutes = require('./categoriaProdutoRoutes');
const tipoProdutoRoutes = require('./tipoProdutoRoutes');
const modeloProdutoRoutes = require('./modeloProdutoRoutes');
const produtoRoutes = require('./produtoRoutes');

router.use(usuarioRoutes);
router.use(integracoesRoutes);
router.use(categoriaProdutoRoutes);
router.use(tipoProdutoRoutes);
router.use(modeloProdutoRoutes);
router.use(produtoRoutes);


module.exports = router;
