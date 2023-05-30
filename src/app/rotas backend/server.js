const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const { rejects } = require('assert');


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
  

  if (!username || !password) {
    res.status(400).json({ message: 'Por favor, preencha todos os campos' });
    return;
  }
  
  // Consultando o banco de dados
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results, fields) {
    if (err) {
      console.log('Erro ao consultar banco de dados:',err);
      res.status(500).json({ message: 'Erro ao autenticar' });
      return;
    } else if (results.length > 0) {
      const user = results[0]; // Aqui você armazena o primeiro usuário retornado na constante "user"
      const nomeUsuario = user.NOME; // Aqui você obtém o nome do usuário
      res.status(200);
      res.json({ success: true,  message: 'Login Realizado com sucesso', nomeUsuario: nomeUsuario});
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
  });
});


// Rota para adicionar um cliente
app.post('/cadclientes', (req, res) => {
  const { nome, email, celular, rua, bairro, numero, cep } = req.body;

  if (!nome || !email || !celular) {
    console.log('Campos obrigátorios não preenchido')
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }

  const query = 'INSERT INTO cad_clientes (nome, email, celular, rua, bairro, numero, cep) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nome, email, celular, rua, bairro, numero, cep], (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente: ' + err.message);
      return res.status(500).json({ message: 'Erro ao inserir cliente' });
    }
    console.log('Cliente inserido com sucesso');
    res.status(200)
    return res.json({ message: 'Cliente inserido com sucesso' });
  });

  function validateEmail(email) {
    // Implemente a validação de e-mail conforme suas necessidades
    // Neste exemplo, vamos verificar se o e-mail contém um @
    return email.includes('@');
  }
});

app.post('/cadusuario', (req, res) => {
  const {id, nome, username, password, token} = req.body;

  if(!username || !password){
    return res.status(400).json({message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  const query = 'INSERT INTO users (id, nome, username, password, token) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [id, nome, username, password, token], (err, result) =>{
    if(err){
      return res.status(500),json({message: 'Erro interno do servidor'});
    }
    res.status(200)
    console.log('usuario cadastrado com sucesso')
    return res.json({message: 'Usuário cadastrado com sucesso'});
  })
})

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000!');
});
