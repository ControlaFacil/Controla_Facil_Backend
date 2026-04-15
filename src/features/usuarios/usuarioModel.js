// O modelo usuarioModel é responsável por interagir com o banco de dados para operações relacionadas aos usuários.

const { pool, query } = require("../../config/db");
const emailToken = require("../../utils/email")

const usuarioModel = {
  // Inserir Usuario
  async inserir({ nome, email, cpf_cnpj, celular, cargo, senha_hash }) {
    try {

      // Criar token de verificação
      const token = emailToken.tokenVerificacao();
      
      const sql = `
                INSERT INTO usuarios (nome, email, cpf_cnpj, celular, cargo, senha_hash, token_verificacao, token_expira)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;

      const params = [nome, email, cpf_cnpj, celular, cargo, senha_hash, token.token, token.tokenExpira];
      const result = await query(sql, params);

      const usuario = await query("SELECT * FROM usuarios WHERE id = ?", [
        result.insertId,
      ]);
      
      return {id: result.insertId, tokenVerificacao: token.token}
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      throw new Error("Erro ao inserir usuário: " + error);
    }
  },

  async atualizar({ id, nome, email, cpf_cnpj, celular, cargo }) {
    try {
      const sql = `
        UPDATE usuarios 
        SET nome = ?, email = ?, cpf_cnpj = ?, celular = ?, cargo = ?
        WHERE id = ?;;
      `;

      const params = [nome, email, cpf_cnpj, celular, cargo, id];

      await query(sql, params);

      const usuario = await query("SELECT * FROM usuarios WHERE id = ?", [id]);

      return usuario[0];
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw new Error("Erro ao atualizar usuário: " + error);
    }
  },

  async listarUsuarios() {
    try {
      const usuarios = await query(
        "SELECT id, nome, email, cpf_cnpj, celular, cargo FROM usuarios"
      );
      return usuarios;
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw new Error("Erro ao listar usuários: " + error);
    }
  },

  async buscarPorId(id) {
    try {
      const result = await query(
        "SELECT id, nome, email, cpf_cnpj, celular, cargo FROM usuarios WHERE id = ?",
        [id]
      );
      return result[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      throw new Error("Erro ao buscar usuário por ID: " + error);
    }
  },

  async buscarPorEmail(email) {
    try {
      const result = await query("SELECT * FROM usuarios WHERE email = ?", [
        email,
      ]);
      return result[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw new Error("Erro ao buscar usuário por email: " + error);
    }
  },

  async existeCpf(cpf_cnpj) {
    try {
      const result = await query(
        "SELECT 1 AS existe FROM usuarios WHERE cpf_cnpj = ?",
        [cpf_cnpj]
      );
      return result.length > 0;
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
      throw new Error("Erro ao verificar CPF: " + error);
    }
  },

  async existeEmail(email) {
    try {
      const result = await query(
        "SELECT 1 AS existe FROM usuarios WHERE email = ?",
        [email]
      );
      return result.length > 0;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      throw new Error("Erro ao verificar email: " + error);
    }
  },

  async existeId(id) {
    try {
      const result = await query(
        "SELECT 1 AS existe FROM usuarios WHERE id = ?",
        [id]
      );
      return result.length > 0;
    } catch (error) {
      console.error("Erro ao verificar ID de usuário:", error);
      throw new Error("Erro ao verificar ID de usuário: " + error);
    }
  },
};

module.exports = usuarioModel;
