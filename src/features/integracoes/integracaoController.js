// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.
const axios = require("axios");
const integracaoModel = require("./integracaoModel");
require("dotenv")

const integracaoController = {
  async cadastrarIntegracao(req, res) {
    const { nome, marketplace } = req.body;
    const usuarioId = req.usuario.id;
    
    try {
      const integracao = await integracaoModel.inserirIntegracao(nome, marketplace, usuarioId);

      if (!integracao.id) {
        return res.status(500).json({
          error: "Erro ao salvar a integração no banco de dados",
          sucesso: false,
        });
      }

      return res.status(201).json({
        message: "Integração cadastrada com sucesso",
        id: integracao.id,
        sucesso: true,
      });

    } catch (error) {
      console.error("Erro ao cadastrar integração:", error);
      return res.status(500).json({
        error: "Erro ao cadastrar integração",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async listarIntegracoes(req, res) { 
    try {
      const integracoes = await integracaoModel.listarTodasIntegracoes();

      if (!integracoes || !integracoes.length) {
        return res.status(404).json({
          error: "Nenhuma integração encontrada",
          integracoes: [],
          sucesso: false,
        });
      }

      return res.status(200).json({
        message: "Integrações listadas com sucesso",
        integracoes,
        sucesso: true,
      });

    } catch (error) {
      console.error("Erro ao listar integrações:", error);
      return res.status(500).json({
        error: "Erro ao listar integrações",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async editarIntegracao(req, res) { 
    const { id, nome} = req.body;

    try {
      if (!id || !nome) {
        return res.status(400).json({
          error: "Dados obrigatórios não informados",
          sucesso: false,
        });
      }

      const integracao = await integracaoModel.editarIntegracao(id, nome);

      if (!integracao.id) {
        return res.status(500).json({
          error: "Erro ao editar integração no banco de dados",
          sucesso: false,
        });
      }

      return res.status(200).json({
        message: "Integração editada com sucesso",
        sucesso: true
      });

    } catch (error) {
      console.error("Erro ao editar integração:", error);
      return res.status(500).json({
        error: "Erro ao editar integração",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async inativarIntegracao(req, res) {
    const { id } = req.params;
    try {
      if (id === null || id === undefined) {
        return res.status(400).json({
          error: "Dados obrigatórios não informados",
          sucesso: false,
        });
      }

      const integracao = await integracaoModel.inativarIntegracao(id);

      if (!integracao) {
        return res.status(500).json({
          error: "Erro ao inativar integração no banco de dados",
          sucesso: false,
        });
      }

      return res.status(200).json({
        message: "Integração inativada com sucesso",
        sucesso: true
      });

    } catch (error) {
      console.error("Erro ao inativar integração:", error);
      return res.status(500).json({
        error: "Erro ao inativar integração",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async authMercadoLivre(req, res) {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        error: "Código de autorização não fornecido",
        sucesso: false,
      });
    }

    try {
      const response = await axios.post(
        "https://api.mercadolibre.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: process.env.ML_CLIENT_ID,
          client_secret: process.env.ML_CLIENT_SECRET,
          code,
          redirect_uri: process.env.ML_REDIRECT_URI,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const dados = response.data;
      const usuarioId = req.usuario.id;

      const integrado = await integracaoModel.inserirIntegracaoConfiguracao(
        usuarioId,
        dados.access_token,
        dados.expires_in,
        dados.user_id,
        dados.refresh_token
      );

      if (!integrado.id) {
        return res.status(500).json({
          error: "Erro ao salvar a integração no banco de dados",
          sucesso: false,
        });
      }

      return res.status(200).json({
        message: "Integração com Mercado Livre realizada com sucesso",
        sucesso: true,
      });

    } catch (error) {
      console.error("Erro na autenticação Mercado Livre:", error.response?.data || error.message);
      return res.status(500).json({
        error: "Erro na autenticação com Mercado Livre",
        message: error.response?.data?.message || error.message,
        sucesso: false,
      });
    }
  },

};

module.exports = integracaoController;
