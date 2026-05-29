const express = require('express');
const router = express.Router();

const usuarioRoutes = require('../features/usuarios/usuarioRoutes');
const integracoesRoutes = require('../features/integracoes/integracaoRoutes');
const categoriaProdutoRoutes = require('../features/categorias/categoriaProdutoRoutes');
const produtoRoutes = require('../features/produtos/produtoRoutes');
const estoqueRoutes = require('../features/estoque/estoqueRoutes');

router.use(usuarioRoutes);
router.use(integracoesRoutes);
router.use(categoriaProdutoRoutes);
router.use(produtoRoutes);
router.use(estoqueRoutes);


module.exports = router;
