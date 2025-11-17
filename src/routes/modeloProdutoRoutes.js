/**
 * @swagger
 * /modelo-produto:
 *   post:
 *     summary: Cria um novo modelo de produto
 *     tags:
 *       - ModeloProduto
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
 *                 example: "A5"
 *               tipo_produto_id:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - nome
 *               - tipo_produto_id
 *     responses:
 *       201:
 *         description: Modelo de produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modeloProduto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     tipo_produto_id:
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
 *         description: Erro interno ao criar modelo de produto
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
 * /modelo-produto:
 *   get:
 *     summary: Lista todos os modelos de produto
 *     tags:
 *       - ModeloProduto
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de modelos de produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modelosProduto:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       tipo_produto_id:
 *                         type: integer
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Erro interno ao listar modelos de produto
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

const express = require("express");

const autenticar = require("../middlewares/autenticar");

const modeloProdutoController = require("../controllers/modeloProdutoController");

const router = express.Router();

router.post("/modelo-produto", modeloProdutoController.inserirModeloProduto);
router.get("/modelo-produto", modeloProdutoController.listarModelosProduto);

module.exports = router;