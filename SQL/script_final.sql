-- Configurações iniciais de CHARSET e ENGINE
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS `usuarios` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,

    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `cpf_cnpj` VARCHAR(18) UNIQUE NOT NULL, 
    `celular` VARCHAR(20),
    `cargo` VARCHAR(100),
    `senha_hash` TEXT NOT NULL,
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `excluido` TINYINT(1) DEFAULT 0,
    `ultimo_login` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `verificado` BOOLEAN DEFAULT FALSE,
    `token_verificacao` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabela de Configuração de Integração (Mercado Livre)
CREATE TABLE IF NOT EXISTS `integracao_configuracao` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT NULL,
  `access_token` VARCHAR(800) NOT NULL,
  `refresh_token` VARCHAR(800) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `mercado_livre_user_id` BIGINT NOT NULL,
  `data_ativacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_integracao_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabela de Categorias
CREATE TABLE IF NOT EXISTS `categoria_produto` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `usuario_criador_id` INT NOT NULL,
    `excluido` TINYINT(1) DEFAULT 0,
    CONSTRAINT `fk_categoria_usuario` FOREIGN KEY (`usuario_criador_id`) REFERENCES `usuario`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabela de Produtos
CREATE TABLE IF NOT EXISTS `produto` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(100) NOT NULL UNIQUE,
    `preco` DECIMAL(10, 2) NOT NULL,
    `descricao` TEXT,
    `condicao` ENUM('new', 'used', 'not_specified') DEFAULT 'new',
    `caracteristicas` MEDIUMTEXT, -- JSON
    `categoria_id` INT NOT NULL,
    `categoria_nome_ml` VARCHAR(255),
    `gtin` VARCHAR(14),
    `ml_item_id` VARCHAR(50),
    `usuario_criador_id` INT NOT NULL,
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `data_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `excluido` TINYINT(1) DEFAULT 0,
    CONSTRAINT `fk_produto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_produto`(`id`),
    CONSTRAINT `fk_produto_usuario` FOREIGN KEY (`usuario_criador_id`) REFERENCES `usuario`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Tabela de Estoque
CREATE TABLE IF NOT EXISTS `estoque` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `produto_id` INT NOT NULL UNIQUE,
    `qtd_disponivel` INT NOT NULL DEFAULT 0,
    `qtd_minima` INT NOT NULL DEFAULT 0,
    `data_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_estoque_produto` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Movimentações de Estoque
CREATE TABLE IF NOT EXISTS `movimentacao_estoque` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `produto_id` INT NOT NULL,
    `usuario_id` INT NOT NULL,
    `quantidade` INT NOT NULL,
    `tipo` ENUM('entrada', 'saida', 'ajuste') NOT NULL,
    `motivo` TEXT,
    `data_hora` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_mov_produto` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`),
    CONSTRAINT `fk_mov_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Imagens dos Produtos
CREATE TABLE IF NOT EXISTS `produto_imagem` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `url_imagem` VARCHAR(500) NOT NULL,
  `ordem` INT DEFAULT 1,
  `destaque` TINYINT(1) DEFAULT 0,
  `data_upload` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_imagem_produto` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Pedidos
CREATE TABLE IF NOT EXISTS `pedido` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_pedido_ml` VARCHAR(255) NOT NULL,
  `data_pedido` DATETIME NOT NULL,
  `total` DECIMAL(10, 2) NOT NULL,
  `status_pedido` VARCHAR(50) NOT NULL,
  `data_atualizacao_status` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Itens do Pedido
CREATE TABLE IF NOT EXISTS `item_pedido` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `preco_unitario` DECIMAL(10, 2) NOT NULL,
  `valor_desconto_item` DECIMAL(10, 2),
  CONSTRAINT `fk_item_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id`),
  CONSTRAINT `fk_item_produto` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
