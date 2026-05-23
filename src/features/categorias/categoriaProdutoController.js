// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.

const categoriaProdutoModel = require("./categoriaProdutoModel");
const mlService = require("../integracoes/mercadoLivreServices");

const categoriaProdutoController = {
    async inserirCategoriaProduto(req, res) {
        try {
            const { nome, descricao } = req.body;
            const usuarioId = req.usuario.id;

            if(!nome){
                return res.status(400).json({
                    error: "'Nome' da categoria é obrigatório!",
                    sucesso: false,
                });
            }

            const novaCategoria = await categoriaProdutoModel.inserir({ 
                nome, 
                descricao: descricao || null, 
                usuario_criador_id: usuarioId
            });

            return res.status(201).json({
                message: "Categoria de produto inserida com sucesso!",
                categoria: novaCategoria,
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
                message: "Categorias de produto listadas com sucesso!",
                categorias: categorias,
                sucesso: true,
            });
        } catch (error) {
            console.error("Erro ao listar categorias de produto:", error);
            return res.status(500).json({
                error: "Erro ao listar categorias de produto",
                sucesso: false,
            });
        }
    },

    async atualizarCategoriaProduto(req, res) {
        try {
            const { id, nome, descricao } = req.body;

            if(!id) {
                return res.status(400).json({
                    error: "'id' da categoria é obrigatório!",
                    sucesso: false,
                });
            }

            if(!nome){
                return res.status(400).json({
                    error: "'Nome' da categoria é obrigatório!",
                    sucesso: false,
                });
            }

            const categoriaAtualizada = await categoriaProdutoModel.atualizar({ 
                id,
                nome, 
                descricao: descricao || null
            });

            return res.status(200).json({
                message: "Categoria de produto atualizada com sucesso!",
                categoria: categoriaAtualizada,
                sucesso: true,
            });

        } catch (error) {
            console.error("Erro ao atualizar categoria de produto:", error);
            return res.status(500).json({
                error: "Erro ao atualizar categoria de produto",
                sucesso: false,
            });
        }
    },

    async excluirCategoriaProduto(req, res) {
        try {
            const { id } = req.params;

            if(!id) {
                return res.status(400).json({
                    error: "'id' da categoria é obrigatório!",
                    sucesso: false,
                });
            }

            await categoriaProdutoModel.excluir(id);

            return res.status(200).json({
                message: "Categoria de produto excluída com sucesso!",
                sucesso: true,
            });

        } catch (error) {
            console.error("Erro ao excluir categoria de produto:", error);
            return res.status(500).json({
                error: "Erro ao excluir categoria de produto",
                sucesso: false,
            });
        }
    },

    async buscarSugestaoCategorias(req, res) {
        try {
            const { integracaoId, titulo } = req.body;

            if(!integracaoId) {
                return res.status(400).json({
                    error: "'integracaoId' é obrigatório!",
                    sucesso: false,
                });
            }

            if(!titulo) {
                return res.status(400).json({
                    error: "'titulo' do produto é obrigatório!",
                    sucesso: false,
                });
            }

            const sugestoes = await mlService.getSugestaoCategorias(integracaoId, titulo);

            return res.status(200).json({
                message: "Sugestões de categorias encontradas com sucesso!",
                sugestoes: sugestoes,
                sucesso: true,
            });
        } catch (error) {
            console.error("Erro ao buscar sugestões de categorias:", error);
            return res.status(500).json({
                error: "Erro ao buscar sugestões de categorias",
                sucesso: false,
            });
        }
    }
}

module.exports = categoriaProdutoController;