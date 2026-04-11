const mysql = require("mysql2/promise");
const path = require("path");

// Carrega o .env da raiz do projeto, independente de onde o processo foi iniciado
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Define as configurações da conexão com o MySQL
const pool = mysql.createPool({
  host: process.env.DB_SERVER || process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  timezone: "Z",
  decimalNumbers: true,
});

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
