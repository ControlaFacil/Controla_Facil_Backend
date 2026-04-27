// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.
const axios = require("axios");
const integracaoModel = require("./integracaoModel");
require("dotenv")

const integracaoController = {
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

      const integrado = await integracaoModel.inserirIntegracao(
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
