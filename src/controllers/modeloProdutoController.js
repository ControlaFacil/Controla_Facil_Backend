// O modeloProdutoController é responsável por gerenciar as operações relacionadas aos modelos de produtos, como inserção, atualização e exclusão de dados.

const modeloProdutoModel = require("../models/modeloProdutoModel");

const modeloProdutoController = {
  async inserirModeloProduto(req, res) {
    try {
        const { nome, tipo_produto_id } = req.body;

        if(!nome){
            return res.status(400).json({
                error: "'nome' é obrigatório",
                sucesso: false,
            });
        }

        if(!tipo_produto_id){
            return res.status(400).json({
                error: "'tipo_produto_id' é obrigatório",
                sucesso: false,
            });
        }

        const modeloProduto = await modeloProdutoModel.inserir({ nome, tipo_produto_id });

        return res.status(201).json({
            modeloProduto,
            sucesso: true,
        });

    } catch (error) {
        console.error("Erro ao inserir modelo de produto:", error);
        return res.status(500).json({
          error: "Erro ao inserir modelo de produto",
          sucesso: false,
        });
    }
  },

  async listarModelosProduto(req, res) {
    try {
        const modelosProduto = await modeloProdutoModel.listarTodos();
        return res.status(200).json({
            modelosProduto,
            sucesso: true,
        });
    } catch (error) {
        console.error("Erro ao listar modelos de produto:", error);
        return res.status(500).json({
          error: "Erro ao listar modelos de produto",
          sucesso: false,
        });
    }
  },
};

module.exports = modeloProdutoController;