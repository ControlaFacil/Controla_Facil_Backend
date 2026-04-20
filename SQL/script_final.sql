-- 1. Tabela de Usuários
IF OBJECT_ID('usuarios', 'U') IS NULL
CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf_cnpj VARCHAR(18) UNIQUE NOT NULL, 
    celular VARCHAR(20),
    cargo VARCHAR(100),
    senha_hash VARCHAR(MAX) NOT NULL,
    data_criacao DATETIME DEFAULT GETDATE(),
    excluido BIT DEFAULT 0,
    ultimo_login DATETIME DEFAULT GETDATE(),
    verificado BIT DEFAULT 0,
    token_verificacao VARCHAR(255) DEFAULT NULL,
    token_expiracao DATETIME DEFAULT NULL
);
GO

-- 2. Tabela de Configuração de Integração (Mercado Livre)
IF OBJECT_ID('integracao_configuracao', 'U') IS NULL
CREATE TABLE integracao_configuracao (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NULL,
    access_token VARCHAR(800) NOT NULL,
    refresh_token VARCHAR(800) NOT NULL,
    expires_at DATETIME NOT NULL,
    mercado_livre_user_id BIGINT NOT NULL,
    data_ativacao DATETIME DEFAULT GETDATE(),
    data_atualizacao DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_integracao_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
GO

-- 4. Tabela de Categorias
IF OBJECT_ID('categoria_produto', 'U') IS NULL
CREATE TABLE categoria_produto (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL,
    usuario_criador_id INT NOT NULL,
    excluido BIT DEFAULT 0,
    CONSTRAINT fk_categoria_usuario FOREIGN KEY (usuario_criador_id) REFERENCES usuarios(id)
);
GO

-- 5. Tabela de Produtos
IF OBJECT_ID('produto', 'U') IS NULL
CREATE TABLE produto (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    preco DECIMAL(10, 2) NOT NULL,
    descricao VARCHAR(MAX),
    condicao VARCHAR(20) DEFAULT 'new' CHECK (condicao IN ('new', 'used', 'not_specified')),
    caracteristicas VARCHAR(MAX), -- JSON
    categoria_id INT NOT NULL,
    categoria_nome_ml VARCHAR(255),
    gtin VARCHAR(14),
    ml_item_id VARCHAR(50),
    usuario_criador_id INT NOT NULL,
    data_criacao DATETIME DEFAULT GETDATE(),
    data_alteracao DATETIME DEFAULT GETDATE(),
    excluido BIT DEFAULT 0,
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria_produto(id),
    CONSTRAINT fk_produto_usuario FOREIGN KEY (usuario_criador_id) REFERENCES usuarios(id)
);
GO

-- 6. Tabela de Estoque
IF OBJECT_ID('estoque', 'U') IS NULL
CREATE TABLE estoque (
    id INT PRIMARY KEY IDENTITY(1,1),
    produto_id INT NOT NULL UNIQUE,
    qtd_disponivel INT NOT NULL DEFAULT 0,
    qtd_minima INT NOT NULL DEFAULT 0,
    data_alteracao DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_estoque_produto FOREIGN KEY (produto_id) REFERENCES produto(id)
);
GO

-- 7. Movimentações de Estoque
IF OBJECT_ID('movimentacao_estoque', 'U') IS NULL
CREATE TABLE movimentacao_estoque (
    id INT PRIMARY KEY IDENTITY(1,1),
    produto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    quantidade INT NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('entrada', 'saida', 'ajuste')),
    motivo VARCHAR(MAX),
    data_hora DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_mov_produto FOREIGN KEY (produto_id) REFERENCES produto(id),
    CONSTRAINT fk_mov_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
GO

-- 8. Imagens dos Produtos
IF OBJECT_ID('produto_imagem', 'U') IS NULL
CREATE TABLE produto_imagem (
    id INT PRIMARY KEY IDENTITY(1,1),
    produto_id INT NOT NULL,
    url_imagem VARCHAR(500) NOT NULL,
    ordem INT DEFAULT 1,
    destaque BIT DEFAULT 0,
    data_upload DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_imagem_produto FOREIGN KEY (produto_id) REFERENCES produto(id)
);
GO

-- 9. Pedidos
IF OBJECT_ID('pedido', 'U') IS NULL
CREATE TABLE pedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_pedido_ml VARCHAR(255) NOT NULL,
    data_pedido DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status_pedido VARCHAR(50) NOT NULL,
    data_atualizacao_status DATETIME NOT NULL
);
GO

-- 10. Itens do Pedido
IF OBJECT_ID('item_pedido', 'U') IS NULL
CREATE TABLE item_pedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    valor_desconto_item DECIMAL(10, 2),
    CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produto(id)
);
GO
