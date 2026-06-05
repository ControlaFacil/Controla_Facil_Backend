const integracaoStatus = Object.freeze({
    EXCLUIDO: 0,
    ATIVO: 1,
    PENDENTE: 2,
    INATIVO: 3
});

const marketplaces = Object.freeze({
    MERCADO_LIVRE: 1,
});

const produtoStatus = Object.freeze({
  ATIVO: 0,
  INATIVO: 1,
  EXCLUIDO: 2
});

const tipoMovimentacaoEstoque = Object.freeze({
  ENTRADA: 1,
  SAIDA:2
})

const condicaoProduto = Object.freeze({
  NOVO: "new",
  USADO: "used",
  RECONDICIONADO: "refurbished",
  NAO_ESPECIFICADO: "not_specified"
})

const statusProduto = Object.freeze({
  ATIVO: 0,
  PAUSADO: 1,
  ENCERRADO: 2
})

const mapStatusProdutoML = Object.freeze({
  [statusProduto.ATIVO]: "active",
  [statusProduto.PAUSADO]: "paused",
  [statusProduto.ENCERRADO]: "closed"
})

module.exports = { 
  integracaoStatus, 
  marketplaces, 
  produtoStatus, 
  tipoMovimentacaoEstoque, 
  condicaoProduto,
  statusProduto,
  mapStatusProdutoML
};