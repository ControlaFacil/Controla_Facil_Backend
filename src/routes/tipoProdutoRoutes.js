const express = require('express');

const autenticar = require('../middlewares/autenticar');

const router = express.Router();

const tipoProdutoController = require('../controllers/tipoProdutoController');

/**
 * @swagger
 * /tipo-produto:
 *   post:
 *     summary: Cria um novo tipo de produto e vincula categorias
 *     tags:
 *       - TipoProduto
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
 *                 example: "Caderno"
 *               categoriaProdutoId:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Tipo de produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tipoProduto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
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
 *         description: Erro interno ao criar tipo de produto
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
 * /tipo-produto:
 *   get:
 *     summary: Lista todos os tipos de produto
 *     tags:
 *       - TipoProduto
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Erro interno ao listar tipos de produto
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

router.post('/tipo-produto', tipoProdutoController.inserirTipoProduto);
router.get('/tipo-produto', tipoProdutoController.listarTiposProduto);

module.exports = router;