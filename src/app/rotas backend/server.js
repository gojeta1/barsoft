const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const users = require('./users.json');

const app = express();

app.use(bodyParser.json());

const JWT_SECRET = 'my-secret';

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.users.find((u) => u.username === username && u.password === password);
  console.log (users)
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }
});

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));

