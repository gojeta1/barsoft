const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
app.use(cors());
// Configurando o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//C:/barsoft/src/app/rotas backend/uploads
// Configurando a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'database-1.c1y1f7ntndzm.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Chuva281180',
  database: 'dbsoft'
});

function generateToken(user) {
  const payload = { id: user.id };
  const secretKey = crypto.randomBytes(32).toString('hex');;
  const options = { expiresIn: '1h' }; // Define o tempo de expiração do token

  return jwt.sign(payload, secretKey, options);
}

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

// Endpoint para atualizar o caminho da imagem de perfil do usuário
app.put('/users/:id/profileImage', upload.single('profileImage'), (req, res) => {
  const userId = req.params.id;
  
   // Verifique se o arquivo de imagem foi enviado corretamente
   if (!req.file) {
    res.status(400).json({ error: 'Nenhum arquivo de imagem enviado' });
    return;
  }
  const imagePath = req.file.path; // Caminho temporário da imagem enviada pelo usuário
  res.setHeader('Cache-Control', 'no-cache');
  const sql = 'UPDATE users SET profile_image = ? WHERE id = ?';
  connection.query(sql, [imagePath, userId], (err) => {
    if (err) {
      console.error('Erro ao atualizar a imagem do perfil:', err);
      res.status(500).send('Erro ao atualizar a imagem do perfil');
    } else {
      res.status(200).send('Imagem do perfil atualizada com sucesso');
    }
  });
});

app.get('/users/:id/profileImage', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT profile_image FROM users WHERE id = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Erro ao obter a imagem do perfil:', err);
      res.status(500).send('Erro ao obter a imagem do perfil');
    } else {
      if (result.length > 0) {
        const profileImagePath = path.resolve('./uploads', result[0].profile_image);

        // Verifica se o caminho da imagem do perfil existe
        if (profileImagePath) {
          // Retorne a imagem do perfil como resposta
          res.setHeader('Cache-Control', 'no-store');
          res.sendFile(profileImagePath);
        } else {
          // Caso o caminho da imagem do perfil esteja vazio ou não exista, retorne uma imagem padrão ou uma resposta de erro
          // Exemplo:
          // res.sendFile(path.join(__dirname, 'caminho/para/a/imagem/padrao.jpg'));
          res.status(404).json({ error: 'Imagem do perfil não encontrada' });
        }
      } else {
        // Caso o usuário com o ID fornecido não seja encontrado, retorne uma resposta de erro
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    }
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
  connection.query('SELECT * FROM users WHERE username = ? ', [username], function(err, results, fields) {
    if (err) {
      console.log('Erro ao consultar banco de dados:',err);
      res.status(500).json({ message: 'Erro ao autenticar' });
      return;
    } else if (results.length > 0) {
      const user = results[0]; // Aqui você armazena o primeiro usuário retornado na constante "user"
      const nomeUsuario = user.NOME; // Aqui você obtém o nome do usuário
      const userId = user.ID;
      const hashArmazenada = user.PASSWORD;
      bcrypt.compare(password, hashArmazenada, function(err, result) {
        if (result) {
          // Senha válida, o usuário está autenticado
          const token = generateToken(userId);
          res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            nomeUsuario: nomeUsuario,
            userId: userId,
            token: token

          })
        } else {
          // Senha inválida
          res.status(401).json({message: 'Senhas não conferem'})
          
        }
      });
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

app.post('/cadusuario', async (req, res) => {
  const {id, nome, username, password, token} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  if(!username || !password){
    return res.status(400).json({message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  const query = 'INSERT INTO users (id, nome, username, password, token) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [id, nome, username, hashedPassword, token], (err, result) =>{
    if(err){
      return res.status(500).json({message: 'Erro interno do servidor'});
    }
    res.status(200)
    console.log('usuario cadastrado com sucesso')
    return res.json({message: 'Usuário cadastrado com sucesso'});
  });
});

app.get('/tabelausuarios', (req, res) => {
  // Código para buscar todos os registros no banco de dados usando Sequelize
  const query = 'SELECT * FROM users';

  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
    res.status(200).json(result);
  });
});

app.put('/tabelausuarios/:id', (req, res) => {
  const registroAtualizado = req.body;
  const registroId = req.params.id;

  // Código para atualizar o registro no banco de dados usando Sequelize

  res.json(registroAtualizado);
});

// Rota para excluir um registro existente
app.delete('/tabelausuarios/:id', (req, res) => {
  const registroId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?'
  // Código para excluir o registro no banco de dados usando Sequelize
  connection.query(query, [registroId], (err,result) =>{
    if(err){
      console.error(err);
      return res.status(500).json({message: 'Erro ao excluir Usuário'})
    }else if(result.length > 0){
      res.status(200).json(result);
    }
  })
  res.sendStatus(204);
});

app.get('/tabelaclientes', (req, res) => {
  // Código para buscar todos os registros no banco de dados usando Sequelize
  const query = 'SELECT * FROM cad_clientes';

  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
    res.status(200).json(result);
  });
});

app.put('/tabelaclientes/:id', (req, res) => {
  const registroAtualizado = req.body;
  const registroId = req.params.id;

  // Código para atualizar o registro no banco de dados usando Sequelize

  res.json(registroAtualizado);
});

// Rota para excluir um registro existente
app.delete('/tabelaclientes/:id', (req, res) => {
  const registroId = req.params.id;
  const query = 'DELETE FROM cad_clientes WHERE id = ?'
  // Código para excluir o registro no banco de dados usando Sequelize
  connection.query(query, [registroId], (err,result) =>{
    if(err){
      console.error(err);
      return res.status(500).json({message: 'Erro ao excluir Cliente'})
    }else if(result.length > 0){
      res.status(200).json(result);
    }
  })
  res.sendStatus(204);
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000!');
});
