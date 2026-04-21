const sql = require("mssql");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER || process.env.DB_HOST,
  pool: {
    max: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // Alterar para true se estiver usando Azure
    trustServerCertificate: true // Permite certificados auto-assinados (útil no desenvolvimento local e conexões locais)
  }
};

// Cria a pool de conexões em promise para ser utilizada através do projeto
const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log("Conexão com o banco de dados (SQL Server) estabelecida com sucesso!");
    return pool;
  })
  .catch(err => {
    console.error("Falha ao conectar ao banco de dados:", err.message);
    process.exit(1);
  });

// Função de query de conveniência
async function query(sqlString) {
  try {
    const pool = await poolPromise;
    // Atenção: O mssql não usa "?" como placeholders para parâmetros da mesma maneira que o mysql.
    // O suporte completo a queries parametrizadas precisará de uso do "request.input('nome', valor)".
    // Essa função servirá como base enquanto as outras partes (models) são ajustadas.
    const result = await pool.request().query(sqlString);
    return result.recordset; // Retorna as linhas equivalentes a 'rows' no mysql
  } catch (error) {
    console.error("Erro na execução da query:", error);
    throw error;
  }
}

// Exporta a pool (como promise) e a função query
module.exports = { pool: poolPromise, query, sql };
