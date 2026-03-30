CREATE TABLE `usuarios` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `endereco_id` INT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `cpf_cnpj` VARCHAR(18) UNIQUE NOT NULL, 
    `celular` VARCHAR(20),
    `cargo` VARCHAR(100),
    `senha_hash` TEXT NOT NULL,
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `excluido` TINYINT(1) DEFAULT 0, 
    FOREIGN KEY (`endereco_id`) REFERENCES `enderecos`(`id`)
);

CREATE TABLE `integracao_configuracao` (
  `id INT PRIMARY KEY AUTO_INCREMENT`,
  `usuario_configurador_id INT NULL`,
  `access_token VARCHAR(800) NOT NULL`,
  `refresh_token VARCHAR(800) NOT NULL`,
  `expires_at DATETIME NOT NULL`,
  `mercado_livre_user_id BIGINT NOT NULL`,
  `data_ativacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
  `data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
);

CREATE TABLE `produtos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(100) NOT NULL UNIQUE,
    `preco` DECIMAL(10, 2) NOT NULL,
    `descricao` TEXT,
    `condicao` ENUM('new', 'used', 'not_specified') DEFAULT 'new',
    `caracteristicas` MEDIUMTEXT, -- JSON com as obrigatoriedades retornadas pelo ML
    `categoria_id` INT NOT NULL,
    `categoria_nome` VARCHAR(255) NOT NULL,
    `gtin` VARCHAR(14) NOT NULL,
    `ml_item_id` VARCHAR(50) NOT NULL,


    `usuario_criador` INT NOT NULL,
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `data_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `excluido` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (`categoria_id`) REFERENCES `categorias_produto`(`id`),
    FOREIGN KEY (`usuario_criador`) REFERENCES `usuarios`(`id`)
);

CREATE TABLE `estoque` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `produto_id` INT NOT NULL UNIQUE,
    `qtd_disponivel` INT NOT NULL DEFAULT 0,
    `qtd_minima` INT NOT NULL DEFAULT 0,
    `data_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`)
);

CREATE TABLE `movimentacoes_estoque` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `produto_id` INT NOT NULL,
    `usuario_id` INT NOT NULL,
    `quantidade` INT NOT NULL,
    `tipo` ENUM('entrada', 'saida', 'ajuste') NOT NULL,
    `motivo` TEXT,
    `data_hora` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`),
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`)
);

CREATE TABLE `produto_imagem` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `url_imagem` VARCHAR(500) NOT NULL,
  `ordem` INT DEFAULT 1,
  `destaque` TINYINT DEFAULT 1,
  `data_upload` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`)
);

CREATE TABLE `pedido` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_pedido_ml` VARCHAR(255) NOT NULL,
  `data_pedido` DATETIME NOT NULL,
  `total` DECIMAL(10, 2) NOT NULL,
  `status_pedido` VARCHAR(50) NOT NULL,
  `data_atualizacao_status` DATETIME NOT NULL
);

CREATE TABLE `item_pedido` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `preco_unitario` DECIMAL(10, 2) NOT NULL,
  `valor_desconto_item` DECIMAL(10, 2)
);

-- Tabela Anuncios

-- Tabela feedback produtos