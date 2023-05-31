const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(cors());
// Configurando o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('C:/barsoft/src/app/rotas backend/uploads'));

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

const uploadPath = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const extension = path.extname(file.originalname);
  if (allowedExtensions.includes(extension.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file extension'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.put('/uploadProfilePicture', upload.single('profilePicture'), (req, res) => {
  // Aqui você pode receber e processar a imagem enviada pelo cliente e armazenar no banco de dados
  // Certifique-se de configurar a pasta 'uploads/' para salvar as imagens
  const profileImage = req.file.filename;
  const imageUrl = 'http://localhost:3000/uploads/' + profileImage;
  const usuarioId = req.params.usuarioId;
  const novaFoto = req.body.foto;
  

  const query = 'UPDATE users SET foto = ? WHERE id = ?';
  connection.query(query, [novaFoto, usuarioId], (err, result) => {
    if (err) {
      console.error('Erro ao salvar a imagem no banco de dados: ' + err.stack);
      res.status(500).json({ message: 'Erro ao salvar a imagem no banco de dados' });
      return;
    }
    res.json({ message: 'Upload realizado com sucesso!', imageUrl: imageUrl });
  });
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
      connection.end();
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
  connection.end();
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
  });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000!');
});
