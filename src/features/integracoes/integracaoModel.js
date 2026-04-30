// // O modelo integracaoModel é responsável por interagir com o banco de dados para operações relacionadas as integrações.

const { pool, query } = require("../../config/db");

const integracaoModel = {
  
  async inserirIntegracao(nome, marketplace, usuarioId) {
     try {
      const dbPool = await pool;
      const result = await dbPool.request()
        .input('nome', nome)
        .input('marketplace', marketplace)
        .input('usuarioId', usuarioId)
        .query(`
          INSERT INTO integracoes (nome, marketplace, usuario_id)
          OUTPUT INSERTED.id
          VALUES (@nome, @marketplace, @usuarioId);
        `);

      return {
        id: result.recordset[0].id
      };
    } catch (error) {
      console.error("Erro ao inserir integração:", error);
      throw new Error("Erro ao inserir integração: " + error);
    }
  },

  async listarTodasIntegracoes() {
    try {
      const dbPool = await pool;
      const result = await dbPool.request()
        .query(`
          SELECT * FROM integracoes where ativo = 1;
        `);

      return result.recordset;
    } catch (error) {
      console.error("Erro ao listar integrações:", error);
      throw new Error("Erro ao listar integrações: " + error);
    }
  },

  async editarIntegracao(id, nome, marketplace) { 
    try {
      const dbPool = await pool;
      const result = await dbPool.request()
        .input('id', id)
        .input('nome', nome)
        .query(`
          UPDATE integracoes
          SET nome = @nome
          WHERE id = @id;
        `);

      const integracao = await dbPool.request()
        .input('id', id)
        .query("SELECT * FROM integracoes WHERE id = @id");

      return {
        id: integracao.recordset[0].id
      };
    } catch (error) {
      console.error("Erro ao editar integração:", error);
      throw new Error("Erro ao editar integração: " + error);
    }
  },

  async inativarIntegracao(id) { 
    try {
      const dbPool = await pool;
      const result = await dbPool.request()
        .input('id', id)
        .query(`
          UPDATE integracoes
          SET ativo = 0
          WHERE id = @id;
        `);

      const integracao = await dbPool.request()
        .input('id', id)
        .query("SELECT * FROM integracoes WHERE id = @id");

      return {
        id: integracao.recordset[0].id
      };
    } catch (error) {
      console.error("Erro ao editar integração:", error);
      throw new Error("Erro ao editar integração: " + error);
    }
  },

  async inserirIntegracaoConfiguracao(usuarioId, access_token, expires_at, mercado_livre_user_id, refresh_token) {
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
