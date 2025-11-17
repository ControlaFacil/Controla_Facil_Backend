// O tipoProdutoController é responsável por gerenciar as operações relacionadas aos tipos de produtos, como inserção, atualização e exclusão de dados.

const tipoProdutoModel = require("../models/tipoProdutoModel");

const tipoProdutoController = {
  async inserirTipoProduto(req, res) {
    try {
        const { nome, categoriaProdutoId } = req.body;

        if(!nome){
            return res.status(400).json({
                error: "'nome' é obrigatório",
                sucesso: false,
            });
        }

        const tipoProduto = await tipoProdutoModel.inserir({ nome });

        if (categoriaProdutoId && Array.isArray(categoriaProdutoId)) {
            await tipoProdutoModel.vincularCategorias(tipoProduto.id, categoriaProdutoId);
        }

        return res.status(201).json({
            tipoProduto,
            sucesso: true,
        });

    } catch (error) {
      console.error("Erro ao inserir tipo de produto:", error);
      return res.status(500).json({
        error: "Erro ao inserir tipo de produto",
        sucesso: false,
      });
    }
  },

  async listarTiposProduto(req, res) {
    try {
        const tiposProduto = await tipoProdutoModel.listarTodos();
        return res.status(200).json({
            data: tiposProduto,
            sucesso: true,
        });
    } catch (error) {
        console.error("Erro ao listar tipos de produto:", error);
        return res.status(500).json({
          error: "Erro ao listar tipos de produto",
          sucesso: false,
        });
    }
  }
};

module.exports = tipoProdutoController;
