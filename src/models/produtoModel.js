// O modelo Produto é responsável por interagir com o banco de dados para operações relacionadas aos produtos.

const { pool, query } = require("../config/db");

const produtoModel = {
  async inserir({
    nome,
    sku,
    descricao,
    preco,
    modelo_produto_id,
    usuario_criador,
  }) {
    try {
      const sql = `INSERT INTO produto (nome, sku, descricao, preco, modelo_produto_id, usuario_criador) VALUES (?, ?, ?, ?, ?, ?);`;
      const params = [
        nome,
        sku,
        descricao,
        preco,
        modelo_produto_id,
        usuario_criador,
      ];
      const result = await query(sql, params);
      const produto = await query(
        "SELECT id, nome, sku, descricao, preco, modelo_produto_id FROM produto WHERE id = ?",
        [result.insertId]
      );
      return produto[0];
    } catch (error) {
      console.error("Erro ao inserir produto:", error);
      throw new Error("Erro ao inserir produto: " + error);
    }
  },

  async listarTodos() {
    try {
      const sql = `SELECT 
p.id produtoId,
p.nome produtoNome,
p.sku sku,
p.descricao descricao,
p.preco,
p.data_criacao dataCriacao,
p.data_alteracao dataAlteracao,
mp.id modeloProdutoId,
mp.nome modeloProdutoNome,
tp.id tipoProdutoId,
tp.nome tipoProdutoNome,
u.id usuarioCriadorId,
u.nome usuarioCriadorNome
FROM produto p
INNER JOIN modelo_produto mp ON mp.id = p.modelo_produto_id
INNER JOIN tipo_produto tp ON tp.id = mp.tipo_produto_id
INNER JOIN usuarios u ON u.id = p.usuario_criador;`;
      const produtos = await query(sql);
      return produtos;
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      throw new Error("Erro ao listar produtos: " + error);
    }
  },

  async listarPorId(id) {
    try {
      const sql = `
            SELECT 
p.id produtoId,
p.nome produtoNome,
p.sku sku,
p.descricao descricao,
p.preco,
p.data_criacao dataCriacao,
p.data_alteracao dataAlteracao,
mp.id modeloProdutoId,
mp.nome modeloProdutoNome,
tp.id tipoProdutoId,
tp.nome tipoProdutoNome,
u.id usuarioCriadorId,
u.nome usuarioCriadorNome
FROM produto p
INNER JOIN modelo_produto mp ON mp.id = p.modelo_produto_id
INNER JOIN tipo_produto tp ON tp.id = mp.tipo_produto_id
INNER JOIN usuarios u ON u.id = p.usuario_criador
where p.id = ?
        `;

      const produto = await query(sql, [id]);
      return produto[0];
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      throw new Error("Erro ao buscar produto por ID: " + error);
    }
  },
};

module.exports = produtoModel;
