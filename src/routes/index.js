const express = require('express');
const router = express.Router();

const usuarioRoutes = require('../features/usuarios/usuarioRoutes');
const integracoesRoutes = require('../features/integracoes/integracaoRoutes');
const categoriaProdutoRoutes = require('../features/categorias/categoriaProdutoRoutes');
const tipoProdutoRoutes = require('../features/tipos/tipoProdutoRoutes');
const modeloProdutoRoutes = require('../features/modelos/modeloProdutoRoutes');
const produtoRoutes = require('../features/produtos/produtoRoutes');

router.use(usuarioRoutes);
router.use(integracoesRoutes);
router.use(categoriaProdutoRoutes);
router.use(tipoProdutoRoutes);
router.use(modeloProdutoRoutes);
router.use(produtoRoutes);


module.exports = router;
