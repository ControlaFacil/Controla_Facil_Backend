// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.
const axios = require("axios");
const integracaoModel = require("../models/integracaoModel");

const integracaoController = {
  async inserirIntegracao(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({
          error: "Nome da integração é obrigatório",
          sucesso: false,
        });
      }

      const integracaoCadastrada = await integracaoModel.inserir({ nome });

      return res.status(201).json({
        message: "Integração inserida com sucesso",
        Integracao: integracaoCadastrada,
        sucesso: true,
      });
    } catch (error) {
      console.error("Erro ao inserir integração:", error);
      return res.status(500).json({
        error: "Erro ao inserir integração",
        sucesso: false,
      });
    }
  },

  async mercadoLivreCallback(req, res) {
    const { code } = req.query;
    if (!code) {
      return res.redirect("https://www.uol.com.br/");
    }

    try {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("client_id", process.env.ML_CLIENTE_ID);
      params.append("client_secret", process.env.ML_CLIENTE_SECRET);
      params.append("code", code);
      params.append("redirect_uri", process.env.ML_REDIRECT_URI);

      const response = await axios.post(
        "https://api.mercadolibre.com/oauth/token",
        params,
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      await integracaoModel.salvarDadosMercadoLivre(response.data);

      return res.redirect(
        "https://controlafacil.vercel.app/integracao-sucesso"
      );
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao processar callback do Mercado Livre: " + error,
        urlRedirect: "https://controlafacil.vercel.app/integracao-erro",
        sucesso: false,
      });
    }
  },
};

module.exports = integracaoController;
