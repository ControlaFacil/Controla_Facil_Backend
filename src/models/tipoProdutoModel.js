// O modelo tipoProduto é responsável por interagir com o banco de dados para operações relacionadas aos tipos de produtos.

const { pool, query } = require("../config/db");

const tipoProdutoModel = {
  async inserir({ nome }) {
    try {
      const sql = `INSERT INTO tipo_produto (nome) VALUES (?);`;
      const params = [nome];
      const result = await query(sql, params);
      const tipoProduto = await query(
        "SELECT id,nome FROM tipo_produto WHERE id = ?",
        [result.insertId]
      );
      return tipoProduto[0];
    } catch (error) {
      console.error("Erro ao inserir tipo de produto:", error);
      throw new Error("Erro ao inserir tipo de produto: " + error);
    }
  },

  async vincularCategorias(tipoProdutoId, categoriaProdutoId) {
    try {
      const sql = `INSERT INTO categoria_tipo_produto (categoria_produto_id, tipo_produto_id) VALUES (?, ?);`;
      const params = categoriaProdutoId.map((categoriaId) => [categoriaId, tipoProdutoId]);
      const promises = params.map((param) => query(sql, param));
      await Promise.all(promises);
    } catch (error) {
      console.error("Erro ao vincular categorias ao tipo de produto:", error);
      throw new Error("Erro ao vincular categorias ao tipo de produto: " + error);
    }
  },

  async listarTodos() {
    try {
      const sql = "SELECT id, nome FROM tipo_produto WHERE excluido = 0";
      const tiposProduto = await query(sql);
      return tiposProduto;
    } catch (error) {
      console.error("Erro ao listar tipos de produto:", error);
      throw new Error("Erro ao listar tipos de produto: " + error);
    }
  },
};

module.exports = tipoProdutoModel;
