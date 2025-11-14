// // O modelo integracaoModel é responsável por interagir com o banco de dados para operações relacionadas as integrações.

const { pool, query } = require("../config/db");

const integracaoModel = {
  async inserir({ nome }) {
    try {
      const sql = `INSERT INTO integracoes (nome) VALUES (?);`;

      const params = [nome];
      const result = await query(sql, params);

      const integracao = await query("SELECT * FROM integracoes WHERE id = ?", [
        result.insertId,
      ]);

      return integracao[0];
    } catch (error) {
      console.error("Erro ao inserir integração:", error);
      throw new Error("Erro ao inserir integração: " + error);
    }
  },

  async salvarDadosMercadoLivre(data) {
    try {
      if (
        !data.access_token ||
        !data.refresh_token ||
        !data.user_id ||
        !data.expires_in
      ) {
        throw new Error(
          "Dados obrigatórios ausentes para integração Mercado Livre."
        );
      }

      const sql = `INSERT INTO integracao_configuracao (integracao_id, access_token, refresh_token, mercado_livre_user_id, expires_at) VALUES (?, ?, ?, ?, ?);`;

      const params = [
        1,
        data.access_token,
        data.refresh_token,
        data.user_id,
        data.expires_in,
      ];

      await query(sql, params);

      const integracaoML = await query(
        "SELECT * FROM integracao_configuracao WHERE mercado_livre_user_id = ?",
        [data.user_id]
      );

      return integracaoML[0];
    } catch (error) {
      console.error("Erro ao salvar dados do Mercado Livre:", error);
      throw new Error("Erro ao salvar dados do Mercado Livre: " + error);
    }
  },
};

module.exports = integracaoModel;
