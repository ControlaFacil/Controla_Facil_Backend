// // O modelo integracaoModel é responsável por interagir com o banco de dados para operações relacionadas as integrações.

const { pool, query } = require("../../config/db");

const integracaoModel = {
  // Código para inserir na tabela configuração integração
  async inserirIntegracao(usuarioId, access_token, expires_at, mercado_livre_user_id, refresh_token) {
    try {
      const dbPool = await pool;
      const result = await dbPool.request()
        .input('usuarioId', usuarioId)
        .input('access_token', access_token)
        .input('expires_at', expires_at)
        .input('mercado_livre_user_id', mercado_livre_user_id)
        .input('refresh_token', refresh_token)
        .query(`
          INSERT INTO integracao_configuracao (usuario_id, access_token, expires_at, mercado_livre_user_id, refresh_token)
          OUTPUT INSERTED.id
          VALUES (@usuarioId, @access_token, @expires_at, @mercado_livre_user_id, @refresh_token);
        `);

      return {
        id: result.recordset[0].id
      };
    } catch (error) {
      console.error("Erro ao inserir integração:", error);
      throw new Error("Erro ao inserir integração: " + error);
    }
  }
};

module.exports = integracaoModel;
