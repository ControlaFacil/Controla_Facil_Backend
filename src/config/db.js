// Importa as bibliotecas mysql2 e dotenv
const mysql = require("mysql2/promise");
require("dotenv").config();

// Define as configurações da conexão com o MySQL
const connectionString = process.env.DATABASE_URL;
const pool = mysql.createPool(connectionString);

// Cria uma pool de conexões
async function query(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Erro na execução da query:", error);
    throw error;
  }
}

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    connection.release();
  } catch (error) {
    console.error("Falha ao conectar ao banco de dados:", error.message);
  }
})();

// Exporta o pool e o módulo sql para uso nos models
module.exports = { pool, query };
