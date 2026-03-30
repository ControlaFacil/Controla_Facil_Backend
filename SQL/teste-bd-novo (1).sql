
CREATE TABLE `enderecos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `rua` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(20), 
    `bairro` VARCHAR(255),
    `cidade` VARCHAR(255) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `complemento` VARCHAR(150)
);

-- 2. TABELA DE USUÁRIOS 
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

-- 3. PRODUTOS E HIERARQUIA 
CREATE TABLE `categorias_produto` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `usuario_criador` INT NOT NULL,
    `excluido` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (`usuario_criador`) REFERENCES `usuarios`(`id`)
);

CREATE TABLE `produtos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(100) NOT NULL UNIQUE,
    `descricao` TEXT,
    `preco` DECIMAL(10, 2) NOT NULL,
    `categoria_id` INT NOT NULL,
    `usuario_criador` INT NOT NULL,
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `data_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `excluido` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (`categoria_id`) REFERENCES `categorias_produto`(`id`),
    FOREIGN KEY (`usuario_criador`) REFERENCES `usuarios`(`id`)
);

-- 4. ESTOQUE E MOVIMENTAÇÃO
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

-- 5. PEDIDOS E VENDAS
CREATE TABLE `pedidos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `usuario_id` INT NOT NULL,
    `numero_externo` VARCHAR(100), --  marketplace
    `data_pedido` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `valor_total` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(50) DEFAULT 'pendente',
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`)
);

CREATE TABLE `itens_pedido` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `pedido_id` INT NOT NULL,
    `produto_id` INT NOT NULL,
    `quantidade` INT NOT NULL,
    `preco_unitario` DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`),
    FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`)
);