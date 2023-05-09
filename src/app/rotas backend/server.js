const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
// Configurando o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'database-1.c1y1f7ntndzm.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Chuva281180',
  database: 'dbsoft'
});

// Conectando ao banco de dados
connection.connect(function(err) {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Criando a rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Consultando o banco de dados
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).send('Erro interno no servidor.');
    } else if (results.length > 0) {
      res.status(200);
      res.json({ success: true, message: 'Login Realizado com sucesso'});
    } else {
      res.status(401).send('Usuário ou senha incorretos.');
    }
  });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000!');
});
