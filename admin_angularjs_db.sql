CREATE TABLE `tb_contato` (
  `id_contato` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `mensagem` varchar(500) NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (id_contato)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_matricula` (
  `id_matricula` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `nascimento` varchar(255) NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (id_matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_slider` (
  `id_slider` int(11) NOT NULL AUTO_INCREMENT,
  `imagem` varchar(255) NOT NULL,
  `ordem` int(11) NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (id_slider)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_usuario` (`id_usuario`, `nome`, `email`, `senha`, `imagem`, `excluido`) VALUES
('Usuário', 'user@email.com', '123456', 'PeSpwwBiU6.png', 0);

CREATE TABLE `tb_video` (
  `id_video` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `excluido` int(11) NOT NULL,
  PRIMARY KEY (id_video)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

