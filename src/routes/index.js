const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const integracoesRoutes = require('./integracaoRoutes');
const categoriaProdutoRoutes = require('./categoriaProdutoRoutes');

router.use(usuarioRoutes);
router.use(integracoesRoutes);
router.use(categoriaProdutoRoutes);

module.exports = router;
