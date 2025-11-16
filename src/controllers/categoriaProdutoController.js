// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.

const categoriaProdutoModel = require("../models/categoriaProdutoModel");

const categoriaProdutoController = {
    async inserirCategoriaProduto(req, res) {
        try {
            const usuario_criador = req.usuario.id;
            const { nome } = req.body;

            if(!nome){
                return res.status(400).json({
                    error: "'nome' é obrigatório",
                    sucesso: false,
                });
            }

            const novaCategoria = await categoriaProdutoModel.inserir({ nome, usuario_criador });

            return res.status(201).json({
                data: novaCategoria,
                sucesso: true,
            });

        } catch (error) {
            console.error("Erro ao inserir categoria de produto:", error);
            return res.status(500).json({
                error: "Erro ao inserir categoria de produto",
                sucesso: false,
            });
        }
    },

    async listarCategoriasProduto(req, res) {
        try {
            const categorias = await categoriaProdutoModel.listarTodas();
            return res.status(200).json({
                data: categorias,
                sucesso: true,
            });
        } catch (error) {
            console.error("Erro ao listar categorias de produto:", error);
            return res.status(500).json({
                error: "Erro ao listar categorias de produto",
                sucesso: false,
            });
        }
    }
}

module.exports = categoriaProdutoController;