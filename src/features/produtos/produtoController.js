// O produtoController é responsável por gerenciar as operações relacionadas aos produtos, como inserção, atualização e exclusão de dados.

const { pool, sql } = require("../../config/db");
const produtoModel = require("./produtoModel");
const estoqueModel = require("../estoque/estoqueModel");
const movimentacaoEstoqueModel = require("../estoque/movimentacaoEstoqueModel");
const produtoImagemModel = require("./produtoImagemModel");
const { tipoMovimentacaoEstoque } = require("../../utils/enums");

const produtoController = {
  async inserirProduto(req, res) {
    let transaction;
    try {
      const { 
        nome, sku, preco, descricao, condicao, categoria_id, caracteristicas, gtin, integracao_id, 
        quantidade_inicial = 0, quantidade_minima = 0, imagens = []
      } = req.body;
      
      const usuario_id = req.usuario?.id || req.body.usuario_criador_id || 5;

      if (!nome || !sku || !preco || !categoria_id || !integracao_id) {
        return res.status(400).json({
          error: "Campos obrigatórios ausentes (nome, sku, preco, categoria_id, integracao_id)",
          sucesso: false,
        });
      }

      const dbPool = await pool;
      transaction = new sql.Transaction(dbPool);
      await transaction.begin();

      // 1. Criar Produto
      const produto = await produtoModel.inserir({
        nome, sku, preco, descricao, condicao, categoria_id, caracteristicas, gtin, integracao_id, usuario_criador_id: usuario_id
      }, transaction);

      // 2. Criar Saldo Inicial de Estoque
      await estoqueModel.criarSaldoInicial(produto.id, quantidade_inicial, quantidade_minima, transaction);

      // 3. Registrar Movimentação se saldo > 0
      if (quantidade_inicial > 0) {
        await movimentacaoEstoqueModel.registrar(
          produto.id, usuario_id, quantidade_inicial, tipoMovimentacaoEstoque.ENTRADA, 'Saldo Inicial de Cadastro', transaction
        );
      }

      // 4. Inserir Imagens
      if (imagens && imagens.length > 0) {
        for (const imagem of imagens) {
          await produtoImagemModel.inserir(produto.id, imagem.url, imagem.ordem, imagem.ehDestaque, transaction);
        }
      }

      await transaction.commit();

      res.status(201).json({ 
        produto: { ...produto, quantidadeInicial: quantidade_inicial, totalImagens: imagens.length }, 
        sucesso: true 
      });

    } catch (error) {
      if (transaction) {
        try {
          await transaction.rollback();
        } catch (rollbackError) {
          console.error("Erro no rollback:", rollbackError);
        }
      }
      console.error("Erro ao inserir produto:", error);
      res.status(500).json({ error: "Erro ao inserir produto: " + error.message });
    }
  },

  async listarProdutos(req, res) {
    try {
      const produtos = await produtoModel.listarTodas();
      res.status(200).json({ produtos, sucesso: true });
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      res.status(500).json({ error: "Erro ao listar produtos: " + error.message });
    }
  },

  async listarProdutoPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await produtoModel.buscarPorId(id);
      
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado", sucesso: false });
      }

      const estoque = await estoqueModel.consultarSaldo(id);
      const imagens = await produtoImagemModel.listarPorProduto(id);

      const produtoDetalhado = {
        ...produto,
        estoque: estoque ? estoque.qtd_disponivel : 0,
        imagens: imagens
      };

      res.status(200).json({ produto: produtoDetalhado, sucesso: true });
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      res.status(500).json({ error: "Erro ao buscar produto por ID: " + error.message });
    }
  },

  async atualizarProduto(req, res) {
    try {
      const { id } = req.params;
      const { nome, sku, preco, descricao, condicao, categoria_id, caracteristicas, gtin } = req.body;
      
      const produtoAtualizado = await produtoModel.atualizar(id, {
        nome, sku, preco, descricao, condicao, categoria_id, caracteristicas, gtin
      });
      
      res.status(200).json({ produto: produtoAtualizado, sucesso: true });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ error: "Erro ao atualizar produto: " + error.message });
    }
  },
  
  async excluirProduto(req, res) {
    try {
      const { id } = req.params;
      await produtoModel.excluir(id);
      res.status(200).json({ mensagem: "Produto excluído com sucesso", sucesso: true });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      res.status(500).json({ error: "Erro ao excluir produto: " + error.message });
    }
  }
};

module.exports = produtoController;
