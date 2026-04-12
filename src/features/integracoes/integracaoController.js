// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.
const axios = require("axios");
const integracaoModel = require("./integracaoModel");
require("dotenv").config();

const integracaoController = {
  async mercadoLivreCallback(req, res) {
    const { code } = req.query;
    if (!code) {
      return res.redirect("https://controlafacil.vercel.app/integracao-erro");
    }

    try {
       const response = await axios.post(
         "https://api.mercadolibre.com/oauth/token",
         {
           grant_type: "authorization_code",
           client_id: "5137782277166166",
           client_secret: "g1naoZfuSzwlMuz40ZRmFia6rPfIZF7Q",
           code,
           redirect_uri: "https://controlafacilbackend-production.up.railway.app/api/integracoes/callback",
         },
         {
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
         }
       );

      await integracaoModel.salvarDadosMercadoLivre(response.data);

      return res.redirect(
        "https://controlafacil.vercel.app/integracao-sucesso"
      );

    } catch (error) {
      res.redirect(
        "https://controlafacil.vercel.app/integracao-erro"
      );
    }
  },
};

module.exports = integracaoController;
