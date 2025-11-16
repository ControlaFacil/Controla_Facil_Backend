const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const integracoesRoutes = require('./integracaoRoutes');
const categoriaProdutoRoutes = require('./categoriaProdutoRoutes');
const tipoProdutoRoutes = require('./tipoProdutoRoutes');

router.use(usuarioRoutes);
router.use(integracoesRoutes);
router.use(categoriaProdutoRoutes);
router.use(tipoProdutoRoutes);


module.exports = router;
