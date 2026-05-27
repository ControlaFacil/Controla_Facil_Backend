const mlApiClient = require("../integracoes/mlApiClient");

const mercadoLivreService = {
  async getSugestaoCategorias(integracaoId, titulo) {
    try {
      if (!titulo || titulo === "") {
        throw Error(
          "O título é obrigatório para buscar sugestões de categoria.",
        );
      }

      const endpoint = `https://api.mercadolibre.com/sites/MLB/domain_discovery/search?q=${titulo}&limit=8`;

      const response = await mlApiClient.chamarApiML(
        integracaoId,
        "get",
        endpoint,
      );

      if (response.length === 0) {
        throw Error("Nenhuma categoria encontrada para o título informado.");
      }

      return response;
    } catch (error) {
      console.error("getSugestaoCategoria - " + error.message);
      throw Error(error.message || "Erro ao buscar categorias");
    }
  },

  async getAtributosCategorias(integracaoId, ml_categoriaId) {
    try {
      if (!ml_categoriaId || ml_categoriaId === "") {
        throw Error("A categoria é obrigatória para buscar atributos.");
      }

      const endpoint = `https://api.mercadolibre.com/categories/${ml_categoriaId}/attributes`;

      const response = await mlApiClient.chamarApiML(
        integracaoId,
        "get",
        endpoint,
      );

      return response;
    } catch (error) {
      console.error("getAtributosCategorias - " + error.message);
      throw Error(error.message || "Erro ao buscar atributos");
    }
  },
};

module.exports = mercadoLivreService;
