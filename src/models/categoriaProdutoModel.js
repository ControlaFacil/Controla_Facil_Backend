// O modelo categoriaProduto é responsável por interagir com o banco de dados para operações relacionadas as categorias de produtos.

const { pool, query } = require("../config/db");

const categoriaProduto = {
    async inserir({nome}) {
        try {
            const sql = `
                INSERT INTO categoria_produto (nome)
                VALUES (?);
            `; 
            
            const params = [nome];

            const result = await query(sql, params);

            const categoria = await query("SELECT * FROM categoria_produto WHERE id = ?", [result.insertId]);

            return categoria[0];
        } catch (error) {
            console.error("Erro ao inserir categoria de produto:", error);
            throw new Error("Erro ao inserir categoria de produto: " + error);
        }
    },

    async listarTodas() {
        try {
            const sql = "SELECT id, nome FROM categoria_produto WHERE excluido = 0";
            const categorias = await query(sql);
            return categorias;
        } catch (error) {
            console.error("Erro ao listar categorias de produto:", error);
            throw new Error("Erro ao listar categorias de produto: " + error);
        }
    }
}

module.exports = categoriaProduto;
