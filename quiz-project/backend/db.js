// backend/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Configuração do banco de dados usando variáveis de ambiente
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quizdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Se DB_SOCKET_PATH estiver definido, usar socket ao invés de host/port
if (process.env.DB_SOCKET_PATH) {
  dbConfig.socketPath = process.env.DB_SOCKET_PATH;
  delete dbConfig.host;
  delete dbConfig.port;
}

const db = mysql.createPool(dbConfig);

// Teste de conexão
db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err.message);
    return;
  }
  console.log("MySQL conectado ao Local Lightning via socket!");
  connection.release();
});

// Tratamento de erros de conexão
db.on('connection', function (connection) {
  console.log('Nova conexão estabelecida com o banco de dados');
});

db.on('error', function(err) {
  console.error('Erro no banco de dados:', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Conexão perdida, tentando reconectar...');
  }
});

module.exports = db;
