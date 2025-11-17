// O produtoController é responsável por gerenciar as operações relacionadas aos produtos, como inserção, atualização e exclusão de dados.

const produtoModel = require("../models/produtoModel");

const produtoController = {
  async inserirProduto(req, res) {
    try {
      const { nome, sku, descricao, preco, modelo_produto_id } = req.body;

      if (!nome || !sku || !preco || !modelo_produto_id) {
        return res.status(400).json({
          error:
            "'nome', 'sku', 'preco' e 'modelo_produto_id' são obrigatórios",
          sucesso: false,
        });
      }

      const produto = await produtoModel.inserir({
        nome,
        sku,
        descricao,
        preco,
        modelo_produto_id,
      });

      res.status(201).json({ produto, sucesso: true });
    } catch (error) {
      console.error("Erro ao inserir produto:", error);
      res
        .status(500)
        .json({ error: "Erro ao inserir produto: " + error.message });
    }
  },

  async listarProdutos(req, res) {
    try {
      const produtos = await produtoModel.listarTodos();
      res.status(200).json({ produtos, sucesso: true });
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      res.status(500).json({ error: "Erro ao listar produtos: " + error.message });
    }
  },

  async listarProdutoPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await produtoModel.listarPorId(id);
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado", sucesso: false });
      }
      res.status(200).json({ produto, sucesso: true });
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      res.status(500).json({ error: "Erro ao buscar produto por ID: " + error.message });
    }
  },
};

module.exports = produtoController;
