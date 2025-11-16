// O modelo modeloProduto é responsável por interagir com o banco de dados para operações relacionadas aos modelos de produtos.

const { pool, query } = require("../config/db");

const modeloProdutoModel = {
  async inserir({ nome, tipo_produto_id, usuario_criador }) {
    try {
        const sql = `INSERT INTO modelo_produto (nome, tipo_produto_id, usuario_criador) VALUES (?, ?, ?);`;
        const params = [nome, tipo_produto_id, usuario_criador];
        const result = await query(sql, params);
        const modeloProduto = await query(
            "SELECT id, nome, tipo_produto_id FROM modelo_produto WHERE id = ?",
            [result.insertId]
        );
        return modeloProduto[0];
    } catch (error) {
      console.error("Erro ao inserir modelo de produto:", error);
      throw new Error("Erro ao inserir modelo de produto: " + error);
    }
  },

  async listarTodos() {
    try {
        const sql = `SELECT id, nome, tipo_produto_id FROM modelo_produto;`;
        const modelosProduto = await query(sql);
        return modelosProduto;
    } catch (error) {
      console.error("Erro ao listar modelos de produto:", error);
      throw new Error("Erro ao listar modelos de produto: " + error);
    }
  },
};

module.exports = modeloProdutoModel;
