// O modelo categoriaProduto é responsável por interagir com o banco de dados para operações relacionadas as categorias de produtos.

const { pool, query } = require("../config/db");

const categoriaProduto = {
    async inserir({nome, usuario_criador}) {
        try {
            const sql = `
                INSERT INTO categoria_produto (nome, usuario_criador)
                VALUES (?, ?);
            `; 
            
            const params = [nome, usuario_criador];

            const result = await query(sql, params);

            const categoria = await query("SELECT * FROM categoria_produto WHERE id = ?", [result.insertId]);

            return categoria[0];
        } catch (error) {
            console.error("Erro ao inserir categoria de produto:", error);
            throw new Error("Erro ao inserir categoria de produto: " + error);
        }
    }
}

module.exports = categoriaProduto;
