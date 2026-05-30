const express = require('express');
const produtoController = require("./produtoController");
const autenticar = require("../../middlewares/autenticar");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

router.post('/produto', autenticar, produtoController.inserirProduto);
router.get('/produto', autenticar, produtoController.listarProdutos);
router.get('/produto/:id', autenticar, produtoController.listarProdutoPorId);
router.put('/produto/:id', autenticar, produtoController.atualizarProduto);
router.delete('/produto/:id', autenticar, produtoController.excluirProduto);

router.post('/produto/upload-imagem', autenticar, upload.single('imagem'), produtoController.uploadImagem);

module.exports = router;