// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.
const axios = require("axios");
const integracaoModel = require("./integracaoModel");
require("dotenv")

const integracaoController = {



  async authMercadoLivre(req, res) {
    const { code } = req.query;
    if (!code) {
      return res.redirect("https://controlafacil.vercel.app/integracao-erro"); // Substituir
    }

    try {
       const response = await axios.post(
         "https://api.mercadolibre.com/oauth/token",
         {
           grant_type: "authorization_code",
           client_id: process.env.ML_CLIENT_ID,
           client_secret: process.env.ML_CLIENT_SECRET,
           code,
           redirect_uri: process.env.ML_REDIRECT_URI, // URL que será cadastrada no ML - Após subir no servidor
         },
         {
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
         }
       );

      await integracaoModel.salvarDadosMercadoLivre(response.data);

      return res.redirect(
        "https://controlafacil.vercel.app/integracao-sucesso" // Substituir
      );

    } catch (error) {
      res.redirect(
        "https://controlafacil.vercel.app/integracao-erro" // Substituir
      );
    }
  },
};

module.exports = integracaoController;
