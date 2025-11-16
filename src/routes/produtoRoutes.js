/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Caderno A5"
 *               sku:
 *                 type: string
 *                 example: "CAD-A5-001"
 *               descricao:
 *                 type: string
 *                 example: "Caderno tamanho A5, capa dura"
 *               preco:
 *                 type: number
 *                 format: float
 *                 example: 19.90
 *               modelo_produto_id:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - nome
 *               - sku
 *               - preco
 *               - modelo_produto_id
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     sku:
 *                       type: string
 *                     descricao:
 *                       type: string
 *                     preco:
 *                       type: number
 *                     modelo_produto_id:
 *                       type: integer
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Erro interno ao criar produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /produto:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Produto
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       produtoId:
 *                         type: integer
 *                       produtoNome:
 *                         type: string
 *                       sku:
 *                         type: string
 *                       descricao:
 *                         type: string
 *                       preco:
 *                         type: number
 *                       dataCriacao:
 *                         type: string
 *                         format: date-time
 *                       dataAlteracao:
 *                         type: string
 *                         format: date-time
 *                       modeloProdutoId:
 *                         type: integer
 *                       modeloProdutoNome:
 *                         type: string
 *                       tipoProdutoId:
 *                         type: integer
 *                       tipoProdutoNome:
 *                         type: string
 *                       usuarioCriadorId:
 *                         type: integer
 *                       usuarioCriadorNome:
 *                         type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Erro interno ao listar produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags:
 *       - Produto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produto:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: integer
 *                     produtoNome:
 *                       type: string
 *                     sku:
 *                       type: string
 *                     descricao:
 *                       type: string
 *                     preco:
 *                       type: number
 *                     dataCriacao:
 *                       type: string
 *                       format: date-time
 *                     dataAlteracao:
 *                       type: string
 *                       format: date-time
 *                     modeloProdutoId:
 *                       type: integer
 *                     modeloProdutoNome:
 *                       type: string
 *                     tipoProdutoId:
 *                       type: integer
 *                     tipoProdutoNome:
 *                       type: string
 *                     usuarioCriadorId:
 *                       type: integer
 *                     usuarioCriadorNome:
 *                       type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Erro interno ao buscar produto por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: false
 */

const express = require('express');

const produtoController = require('../controllers/produtoController');  

const autenticar = require('../middlewares/autenticar');

const router = express.Router();

router.post('/produto', autenticar, produtoController.inserirProduto);
router.get('/produto', autenticar, produtoController.listarProdutos);
router.get('/produto/:id', autenticar, produtoController.listarProdutoPorId);

module.exports = router;